import time
from fastapi.responses import FileResponse
from fastapi import APIRouter, Depends, status, HTTPException, UploadFile, File
from fastapi_pagination import Page, paginate
from sqlalchemy import select, func, desc, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src import oauth2, Stage
from src.database import get_async_session
from src.order.models import Order, OrderRoom, OrderImage, OrderCheck, FinishDoc
from src.order.schemas.order import OrderCreateSchema, OrderFilterSchema, OrderResponseSchema, OrderDeclineSchema, \
    OrderResponseListSchema, OrderAcceptSchema
from .dependencies import valid_workers
from .enums import Status
from ..auth.dependencies import get_manager_user, get_client_user
from ..auth.enums import Type
from ..auth.models import User, builder_order_group
from ..cloud import upload_images, delete_files_after_order_delete, upload_file
from ..design.models import Design
from ..notifications.models import Notification
from ..utils import save_file

order_router = APIRouter()
file_router = APIRouter()


@order_router.post("/", status_code=status.HTTP_201_CREATED)
async def order_create_by_client(
        order: OrderCreateSchema,
        session: AsyncSession = Depends(get_async_session),
        user=Depends(get_client_user),
):
    start_time = time.time()
    check_count = time.time()
    result = await session.execute(select(func.count()).where(Order.client_id == user.id, Order.status == Status.NEW))
    count = result.scalar()
    if count > 2:
        raise HTTPException(detail='You have more than 3 new orders', status_code=status.HTTP_400_BAD_REQUEST)
    print(time.time() - check_count, "check_count time")
    order_rooms = order.order_room
    del order.order_room
    order_create_time = time.time()
    new_order = Order(client_id=user.id, status=Status.NEW, **order.dict())
    session.add(new_order)
    await session.flush()
    print(time.time() - order_create_time, "order_create time ")

    order_room_time = time.time()
    order_rooms_data = [order_room.dict(exclude={"order_image", "order_id"}) for order_room in order_rooms]
    new_order_rooms = [OrderRoom(order_id=new_order.id, **data) for data in order_rooms_data]
    session.add_all(new_order_rooms)
    await session.flush()
    print(time.time() - order_room_time, "order_room create time")
    start_send_image = time.time()
    saved_image_data = await upload_images([{"image": order_image.image,
                                             "order_room_id": new_order_rooms[i].id} for i, order_room in
                                            enumerate(order_rooms) for
                                            order_image in order_room.order_image])
    print(saved_image_data)
    print(time.time() - start_send_image, "image send time")
    image_create_time = time.time()
    images = [OrderImage(**data) for data in saved_image_data]
    session.add_all(images)
    await session.flush()
    print(time.time() - image_create_time, "image_create_time")
    notifi_create_time = time.time()
    users_query = await session.execute(select(User).filter_by(type=Type.manager))
    managers = [x.id for x in users_query.scalars().all()]
    notifications_data = [
        {"order_id": new_order.id,
         "user_id": manager_id,
         "title": f"Клиент сделал заказ №{new_order.id}",
         } for manager_id in managers]
    notifs = [Notification(**data) for data in notifications_data]
    session.add_all(notifs)
    await session.commit()
    print(time.time() - notifi_create_time, "notifi_create_time")
    print(time.time() - start_time, "total_time")
    return {"status": 201}


@order_router.get('/images')
async def get_order_images(session: AsyncSession = Depends(get_async_session)):
    return await OrderImage.get_all(session)


@order_router.get('/rooms')
async def get_order_rooms(session: AsyncSession = Depends(get_async_session)):
    return await OrderRoom.get_all(session)


@order_router.get("/", response_model=Page[OrderResponseListSchema])
async def my_orders(
        filters: OrderFilterSchema = Depends(),
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Order).options(selectinload(Order.client)).order_by(desc(Order.id))
    if user.type == Type.manager:
        query = query.filter(or_(Order.manager_id == user.id, Order.status == Status.NEW))
    elif user.type == Type.builder:
        query = query.options(selectinload(Order.builders)).join(builder_order_group).join(User).filter(
            User.id == user.id)
    elif user.type == Type.admin:
        query = query
    else:
        filter_by_user_type = f"filters.{user.type.value}_id = {user.id}"
        exec(filter_by_user_type)
    orders = await Order.get_all(session, query, filters)
    return paginate(orders)


@order_router.delete('/{order_id}')
async def order_delete(
        order_id: int,
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    stmt = select(Order).options(selectinload(Order.order_room).selectinload(OrderRoom.order_image))
    order = await Order.get(session, stmt, id=order_id)
    if order.client_id != user.id and user.type != Type.admin:
        raise HTTPException(detail="It's not your order", status_code=status.HTTP_400_BAD_REQUEST)
    if order.status != Status.NEW:
        raise HTTPException(detail="You can delete only new orders", status_code=status.HTTP_400_BAD_REQUEST)
    await delete_files_after_order_delete(order.get_order_images_public_ids())
    await order.delete(session)
    return {"status": 200}


@order_router.patch("/{order_id}/accept", response_model=OrderAcceptSchema)
async def accept_order(
        order_id: int,
        workers=Depends(valid_workers),
        user=Depends(get_manager_user),
        session: AsyncSession = Depends(get_async_session),
):
    stmt = select(Order).options(
        selectinload(Order.builders),
        selectinload(Order.manager),
        selectinload(Order.meauser),
        selectinload(Order.designer),
        selectinload(Order.client)).filter_by(id=order_id)

    order = await Order.get(session, stmt)
    if order.status != Status.NEW:
        raise HTTPException(detail="Order is not new", status_code=status.HTTP_400_BAD_REQUEST)
    await order.update(session, status=Status.APPROVED, manager_id=user.id, **workers)
    users_id = [order.meauser_id, order.designer_id] + await order.builder_ids()
    notifs = [{'order_id': order.id, 'user_id': user_id, 'title': f'У вас новый заказ №{order.id}'} for user_id in
              users_id]
    notifs.append({'order_id': order.id, 'user_id': order.client_id, 'title': f'Ваш заказ №{order.id} одобрен'})
    await Notification.bulk_create(session, notifs)
    await session.refresh(order)
    return order


@order_router.patch('/{order_id}/decline')
async def decline_order(
        order_id: int,
        order_schema: OrderDeclineSchema,
        user=Depends(get_manager_user),
        session: AsyncSession = Depends(get_async_session),
):
    order = await Order.get(session, id=order_id)
    if order.status != Status.NEW:
        raise HTTPException(detail='You can decline only new orders', status_code=status.HTTP_400_BAD_REQUEST)
    notifi = Notification(title=f'Вам отказано в заказе №{order_id}', user_id=order.client_id, order_id=order_id)
    await notifi.save(session)
    await order.update(session, manager_id=user.id, status=Status.DENIED, **order_schema.dict())
    return order


@order_router.get("/{order_id}", response_model=OrderResponseSchema)
async def get_order(
        order_id: int, user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    options = [
        selectinload(Order.order_room).selectinload(OrderRoom.order_image),
        selectinload(Order.client),
        selectinload(Order.meauser),
        selectinload(Order.designer),
        selectinload(Order.manager),
        selectinload(Order.builders),
        selectinload(Order.measurement),
        selectinload(Order.stage),
        selectinload(Order.pre_work_doc),
        selectinload(Order.notification),
        selectinload(Order.design).selectinload(Design.sample_image),
        selectinload(Order.order_check),
        selectinload(Order.finish_doc),
        selectinload(Order.stage).selectinload(Stage.stage_image)
    ]
    stmt = select(Order).filter_by(id=order_id).options(*options)
    order = await Order.get(session, query=stmt)
    if user.id not in await order.order_users() and user.type not in (Type.admin, Type.manager):
        raise HTTPException(detail='It is not your order', status_code=status.HTTP_400_BAD_REQUEST)
    return order


@order_router.post('/{order_id}/check', status_code=status.HTTP_201_CREATED, tags=['Check'])
async def create_check(
        order_id: int, user=Depends(get_client_user),
        image: UploadFile = File(...),
        session: AsyncSession = Depends(get_async_session),
):
    order = await Order.get(session, id=order_id)
    if user.id != order.client_id:
        raise HTTPException(detail='You are not client of this order', status_code=status.HTTP_400_BAD_REQUEST)
    if order.status != Status.CONTRACT_ATTACHED\
            and order.status != Status.CHECK_DECLINED\
            and order.status != Status.CHECK_APPROVED\
            and order.status != Status.STAGE_REPORT_ATTACHED:
        raise HTTPException(detail='Order status is wrong', status_code=status.HTTP_400_BAD_REQUEST)
    if order.status == Status.FINISH_DOC_ATTACHED:
        raise HTTPException(detail='Order status is wrong', status_code=status.HTTP_400_BAD_REQUEST)
    image = await upload_file(image)
    check = OrderCheck(order_id=order_id, image=image)
    await order.update(session, status=Status.CHECK_ATTACHED)
    await check.save(session)
    return check


@order_router.patch('/check/{check_id}/approve', tags=['Check'])
async def check_approve(
        check_id: int,
        user=Depends(get_manager_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(OrderCheck).options(selectinload(OrderCheck.order))
    check = await OrderCheck.get(session, query, id=check_id)
    if check.is_approved is not None:
        raise HTTPException(detail='It is not a new check', status_code=status.HTTP_400_BAD_REQUEST)
    if user.id != check.order.manager_id:
        raise HTTPException(detail='You are not manager of this order', status_code=status.HTTP_400_BAD_REQUEST)
    await check.update(session, is_approved=True)
    await check.order.update(session, status=Status.CHECK_APPROVED)
    return {"status": 200}


@order_router.patch('/check/{check_id}/decline', tags=['Check'])
async def check_decline(
        check_id: int,
        user=Depends(get_manager_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(OrderCheck).options(selectinload(OrderCheck.order))
    check = await OrderCheck.get(session, query, id=check_id)
    if check.is_approved is not None:
        raise HTTPException(detail='It is not a new check', status_code=status.HTTP_400_BAD_REQUEST)
    if user.id != check.order.manager_id:
        raise HTTPException(detail='You are not manager of this order', status_code=status.HTTP_400_BAD_REQUEST)
    await check.update(session, is_approved=False)
    await check.order.update(session, status=Status.CHECK_DECLINED)
    return {"status: 200"}


@order_router.patch('/{order_id}/upload_doc_file')
async def upload_order_doc_file(
        order_id: int,
        user=Depends(get_manager_user),
        file: UploadFile = File(...),
        session: AsyncSession = Depends(get_async_session),
):
    order = await Order.get(session, id=order_id)
    if order.manager_id != user.id:
        raise HTTPException(detail='You are not manager of this order', status_code=status.HTTP_400_BAD_REQUEST)
    if order.status != Status.PREWORK_APPROVED:
        raise HTTPException(detail='Order status is not PREWORK_APPROVED', status_code=status.HTTP_400_BAD_REQUEST)
    path = f"media/order/{order_id}/doc_file/"
    full_path = await save_file(path, file)
    await order.update(session, doc_text=full_path, status=Status.CONTRACT_ATTACHED)
    return {"filename": full_path}


@file_router.get('/media/order/{order_id}/doc_file/{filename}/')
async def read_order_doc_file(
        order_id: int,
        filename: str,
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Order).options(selectinload(Order.builders))
    order = await Order.get(session, query, id=order_id)
    if user.id not in await order.order_users():
        raise HTTPException(detail="You don't have access", status_code=status.HTTP_400_BAD_REQUEST)
    requested_path = f'media/order/{order_id}/doc_file/{filename}'
    if requested_path != order.doc_text:
        raise HTTPException(detail='Not Found', status_code=status.HTTP_404_NOT_FOUND)
    return FileResponse(order.doc_text, filename=filename)


@file_router.get('/media/order/{order_id}/finish_doc/{filename}/')
async def read_finish_doc_file(
        order_id: int,
        filename: str,
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Order).options(selectinload(Order.builders))
    order = await Order.get(session, query, id=order_id)
    finish_doc = await FinishDoc.get(session, order_id=order_id)
    if user.id not in await order.order_users():
        raise HTTPException(detail="You don't have access", status_code=status.HTTP_400_BAD_REQUEST)
    requested_path = f'media/order/{order_id}/finish_doc/{filename}'
    if requested_path != finish_doc.file:
        raise HTTPException(detail='Not Found', status_code=status.HTTP_404_NOT_FOUND)
    return FileResponse(finish_doc.file, filename=filename)


@order_router.post('/orders/{order_id}/finish_doc')
async def create_order_finish_doc(
        order_id: int,
        file: UploadFile = File(...),
        user=Depends(get_manager_user),
        session: AsyncSession = Depends(get_async_session)
):
    order = await Order.get(session, id=order_id)
    if order.manager_id != user.id:
        raise HTTPException(detail='You are not manager of this order', status_code=status.HTTP_400_BAD_REQUEST)
    if order.status != Status.CHECK_APPROVED:
        raise HTTPException(detail='Order status is not CHECK_APPROVED', status_code=status.HTTP_400_BAD_REQUEST)
    path = f'media/order/{order_id}/finish_doc/'
    full_path = await save_file(path, file)
    finish_doc = FinishDoc(order_id=order_id, file=full_path)
    await finish_doc.save(session)
    await order.update(session, status=Status.FINISH_DOC_ATTACHED)
    return {'filename': full_path}

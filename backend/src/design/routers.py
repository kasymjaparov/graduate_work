from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src import oauth2, Notification
from src.auth.dependencies import get_designer_user, get_client_user
from src.cloud import upload_images
from src.database import get_async_session
from src.design.models import Design, SampleImage
from src.design.schemas.design import DesignCreate, DesignUpdateSchema, DesignDeclineSchema
from src.order.enums import Status
from src.order.models import Order

design_router = APIRouter()


@design_router.post('/', status_code=status.HTTP_201_CREATED)
async def create_design(
        design: DesignCreate,
        user=Depends(get_designer_user),
        session: AsyncSession = Depends(get_async_session),
):
    order = await Order.get(session, id=design.order_id)
    if order.status != Status.MEASURE_ATTACHED and order.status != Status.DESIGN_DENIED:
        raise HTTPException(detail="You can create design only for MEASURE_ATTACHED status orders",
                            status_code=status.HTTP_400_BAD_REQUEST)
    designs = await Design.get_all(session, order_id=design.order_id, is_approved=True)
    if designs:
        raise HTTPException(detail="Approved design already exists", status_code=status.HTTP_400_BAD_REQUEST)
    new_design = Design(user_id=user.id, **design.dict())
    await new_design.save(session)
    order.status = Status.DESIGN_TIME
    notifi_client = dict(
        user_id=order.client_id,
        title=f'Дизайнер назначил время',
        order_id=order.id,
    )
    notifi_manager = dict(
        user_id=order.manager_id,
        title=f'Дизайнер назначил время',
        order_id=order.id,
    )
    await Notification.bulk_create(session, [notifi_manager, notifi_client])
    await session.commit()
    return new_design


@design_router.get('/{design_id}')
async def get_design(
        design_id: int,
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Design).options(selectinload(Design.sample_image), selectinload(Design.order))
    design = await Design.get(session, query, id=design_id)
    return design


@design_router.patch('/{design_id}/upload_file')
async def upload_file_to_design(
        design_id: int,
        design_payload: DesignUpdateSchema,
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Design).options(selectinload(Design.sample_image), selectinload(Design.order)).filter_by(id=design_id, user_id=user.id)
    design = await Design.get(session, query)
    if design.order.status != Status.DESIGN_TIME:
        raise HTTPException(
            detail='Order status should be DESIGN_TIME',
            status_code=status.HTTP_400_BAD_REQUEST
        )
    images_list = [{"image": sample_image.image,
                    "design_id": design_id,
                    'description': sample_image.description} for
                   sample_image in design_payload.sample_image] + [{"image": design_payload.file}]
    saved_image_data = await upload_images(images_list)
    images = [{**data} for data in saved_image_data if data.get('design_id')]
    file = [{**data} for data in saved_image_data if not data.get('design_id')][0]['image']
    design_payload.file = file
    await design.update(session, **design_payload.dict(exclude={"sample_image"}))
    await SampleImage.bulk_create(session, images)
    await session.refresh(design)
    await design.order.update(session, status=Status.DESIGN_ATTACHED)
    notifi_client = dict(
        title=f'Дизайнер прикрепил дизайн к заказу №{design.order_id}',
        user_id=design.order.client_id,
        order_id=design.order_id
    )
    notifi_manager = dict(
        title=f'Дизайнер прикрепил дизайн к заказу №{design.order_id}',
        user_id=design.order.manager_id,
        order_id=design.order_id
    )
    await Notification.bulk_create(session, [notifi_manager, notifi_client])
    return design


@design_router.patch('/{design_id}/accept')
async def design_accept(
        design_id: int,
        user=Depends(get_client_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Design).options(selectinload(Design.order))
    design = await Design.get(session, query, id=design_id)
    if user.id != design.order.client_id:
        raise HTTPException(detail="You are not client of design's order", status_code=status.HTTP_400_BAD_REQUEST)
    design.is_approved = True
    design.order.status = Status.DESIGN_APPROVED
    await session.commit()
    await session.refresh(design)
    return design


@design_router.patch('/{design_id}/decline')
async def design_decline(
        design_id: int,
        payload: DesignDeclineSchema,
        user=Depends(get_client_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Design).options(selectinload(Design.order))
    design = await Design.get(session, query, id=design_id)
    if design.is_approved:
        raise HTTPException(detail="Design is already approved", status_code=status.HTTP_400_BAD_REQUEST)
    if design.cancel_reason:
        raise HTTPException(detail="Design is already declined", status_code=status.HTTP_400_BAD_REQUEST)
    if user.id != design.order.client_id:
        raise HTTPException(detail="You are not client of design's order", status_code=status.HTTP_400_BAD_REQUEST)
    design.cancel_reason = payload.cancel_reason
    design.is_approved = False
    design.order.status = Status.DESIGN_DENIED
    await session.commit()
    await session.refresh(design)
    return design

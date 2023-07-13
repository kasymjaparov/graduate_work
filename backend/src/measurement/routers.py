from fastapi import APIRouter, Depends, UploadFile, File, Form, Query, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src import oauth2, Notification
from src.auth.dependencies import get_meauser_user
from src.cloud import upload_file
from src.database import get_async_session
from src.measurement.dependencies import order_meauser_create
from src.measurement.models import Measurement
from src.order import Order
from src.order.enums import Status

measurement_router = APIRouter()


@measurement_router.post('/', status_code=status.HTTP_201_CREATED)
async def create_measurement(
        order: dict = Depends(order_meauser_create),
        session: AsyncSession = Depends(get_async_session),
):
    new_obj = Measurement(**order)
    await new_obj.save(session)
    order_obj = order['order']
    await order['order'].update(session, status=Status.MEASURE_TIME)
    notifi_client = dict(
        user_id=order_obj.client_id,
        order_id=order_obj.id,
        title=f'Было установлено время замера',
    )
    notifi_manager = dict(
        user_id=order_obj.manager_id,
        order_id=order_obj.id,
        title=f'Было установлено время замера',
    )
    await Notification.bulk_create(session, [notifi_manager, notifi_client])
    return new_obj


@measurement_router.patch('/{measurement_id}')
async def add_file_to_measurement(
        measurement_id: int,
        comment: str = Form(...),
        file: UploadFile = File(...),
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Measurement).filter_by(id=measurement_id).options(selectinload(Measurement.order))
    measurement = await Measurement.get(session, query)
    if measurement.order.meauser_id != user.id:
        raise HTTPException(detail="You are not meauser of this order", status_code=status.HTTP_400_BAD_REQUEST)
    if measurement.order.status != Status.MEASURE_TIME:
        raise HTTPException(detail="Order status is not measure_time", status_code=status.HTTP_400_BAD_REQUEST)
    measurement.file = await upload_file(file)
    measurement.comment = comment
    measurement.order.status = Status.MEASURE_ATTACHED
    notifi_designer = dict(
        title=f'Замер на заказ №{measurement.order.id} был прикреплен',
        user_id=measurement.order.designer_id,
        order_id=measurement.order.id,
    )
    notifi_manager = dict(
        title=f'Замер на заказ №{measurement.order.id} был прикреплен',
        user_id=measurement.order.manager_id,
        order_id=measurement.order.id,
    )
    await Notification.bulk_create(session, [notifi_manager, notifi_designer])
    await session.commit()
    await session.refresh(measurement)
    return measurement


@measurement_router.delete('/{measurement_id}')
async def get_measurement(
        measurement_id: int,
        session: AsyncSession = Depends(get_async_session),
):

    meas = await Measurement.get(session, id=measurement_id)
    await meas.delete(session)
    return {"12": "12"}

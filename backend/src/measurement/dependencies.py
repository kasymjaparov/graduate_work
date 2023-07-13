from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.dependencies import get_meauser_user
from src.database import get_async_session
from src.measurement.schemas import MeasurementCreateSchema, MeasurementUploadFileSchema
from src.order.enums import Status
from src.order.models import Order


async def order_meauser_create(
        measurement: MeasurementCreateSchema,
        user=Depends(get_meauser_user),
        session: AsyncSession = Depends(get_async_session),
) -> dict[str, any]:
    order = await Order.get(session, id=measurement.order_id)
    if order.meauser_id != user.id:
        raise HTTPException(detail="You are not meauser of this order", status_code=status.HTTP_400_BAD_REQUEST)
    if order.status == Status.MEASURE_TIME:
        raise HTTPException(detail="It is already meausered", status_code=status.HTTP_400_BAD_REQUEST)
    if order.status != Status.APPROVED:
        raise HTTPException(detail="Only approved order can be meausered", status_code=status.HTTP_400_BAD_REQUEST)
    measurement = measurement.dict()
    measurement['order'] = order
    return measurement


async def measurement_upload_file(measurement: MeasurementUploadFileSchema,
                                  user=Depends(get_meauser_user),
                                  session: AsyncSession = Depends(get_async_session)):
    order = await Order.get(session, id=measurement)
    if order.meauser_id != user.id:
        raise HTTPException(detail="You are not meauser of this order", status_code=status.HTTP_400_BAD_REQUEST)
    if order.status != Status.MEASURE_TIME:
        raise HTTPException(detail="Order status is not measure_time", status_code=status.HTTP_400_BAD_REQUEST)
    data = measurement.dict()
    return data

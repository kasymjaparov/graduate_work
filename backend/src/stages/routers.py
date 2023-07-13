import time

from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src import Order, Status
from src.auth.dependencies import get_builder_user
from src.cloud import upload_images
from src.database import get_async_session
from src.stages.models import Stage, StageImage
from src.stages.schemas import StageCreate

stages_router = APIRouter()


@stages_router.post('/stages/{order_id}', status_code=status.HTTP_201_CREATED)
async def create_stage(
        order_id: int,
        stage: StageCreate,
        session: AsyncSession = Depends(get_async_session),
        user=Depends(get_builder_user)
):
    query = select(Order).options(selectinload(Order.builders))
    order = await Order.get(session, query, id=order_id)
    if user.id not in await order.builder_ids():
        raise HTTPException(detail='You are not builder of this order', status_code=status.HTTP_400_BAD_REQUEST)
    new_stage = Stage(order_id=order_id, **stage.dict(exclude={"stage_image"}))
    session.add(new_stage)
    await session.flush()
    saved_images = await upload_images([{"image": image.image, "stage_id": new_stage.id} for image in stage.stage_image])
    stage_images = [StageImage(**data) for data in saved_images]
    session.add_all(stage_images)
    await order.update(session, status=Status.STAGE_REPORT_ATTACHED)
    await session.commit()
    return {"status": 201}

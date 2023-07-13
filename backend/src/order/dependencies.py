from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from src.auth.enums import Type
from src.auth.models import User
from src.database import get_async_session
from src.order.schemas.order import OrderDependSchema


async def valid_workers(payload: OrderDependSchema, session: AsyncSession = Depends(get_async_session)):
    meauser = await User.get(session, id=payload.meauser_id)
    if meauser.type != Type.meauser:
        raise HTTPException(detail=f'User: {payload.meauser_id} is not meauser',
                            status_code=status.HTTP_400_BAD_REQUEST)
    designer = await User.get(session, id=payload.designer_id)
    if designer.type != Type.designer:
        raise HTTPException(detail=f'User: {payload.meauser_id} is not designer',
                            status_code=status.HTTP_400_BAD_REQUEST)
    builder_objs = []
    for worker in payload.builder_id:
        builder = await User.get(session, id=worker)
        if builder.type != Type.builder:
            raise HTTPException(detail=f'User: {payload.meauser_id} is not builder',
                                status_code=status.HTTP_400_BAD_REQUEST)
        builder_objs.append(builder)
    return {"meauser_id": payload.meauser_id, "designer_id": payload.designer_id, "builders": builder_objs,
            "repair_type": payload.repair_type}

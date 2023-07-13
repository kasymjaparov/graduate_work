from fastapi import APIRouter, Depends, HTTPException, status

from src import oauth2
from src.auth.models import User
from src.auth.schemas import UserResponse, UserBase, UserFilterSchema
from ..enums import Type
from ...database import get_async_session

users_router = APIRouter()


@users_router.get("/me", response_model=UserResponse)
def get_me(
    user: User = Depends(oauth2.require_user),
):
    return user


@users_router.get("/", response_model=list[UserResponse])
async def get_all_users_with_filters(
        filters: UserFilterSchema = Depends(),
        user=Depends(oauth2.require_user),
        session=Depends(get_async_session),
):
    if user.type != Type.manager and user.type != Type.admin:
        raise HTTPException(detail="You don't have manager or manager rights", status_code=status.HTTP_403_FORBIDDEN)
    filtered_query = await User.get_all(session, filters=filters)
    return filtered_query


@users_router.patch("/", status_code=200)
async def patch_user(
        payload: UserBase,
        user=Depends(oauth2.require_user),
        session=Depends(get_async_session),
):
    db_user = await User.get(session, id=user.id)
    await db_user.update(session, **payload.dict(exclude_none=True))
    return db_user

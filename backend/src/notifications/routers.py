from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src import oauth2
from src.database import get_async_session
from src.notifications.models import Notification
from src.notifications.schemas import NotificationResponse

notification_router = APIRouter()


@notification_router.get('/', response_model=list[NotificationResponse] | None)
async def get_my_notifications(
        user=Depends(oauth2.require_user),
        session=Depends(get_async_session)
):
    return await Notification.get_all(session, user_id=user.id)


@notification_router.patch('/{notification_id}', response_model=NotificationResponse)
async def watch_notification(notification_id: int, user=Depends(oauth2.require_user),
                             session: AsyncSession = Depends(get_async_session),
                             ):
    notification = await Notification.get(session, id=notification_id)
    if user.id != notification.user_id:
        raise HTTPException(detail="It is not your notification", status_code=status.HTTP_400_BAD_REQUEST)
    if notification.watched:
        raise HTTPException(detail="Notification is already watched", status_code=status.HTTP_400_BAD_REQUEST)
    notification.watched = True
    await session.commit()
    await session.refresh(notification)
    return notification

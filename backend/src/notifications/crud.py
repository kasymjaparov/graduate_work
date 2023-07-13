from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.database import get_async_session
from src.notifications.models import Notification
from src.notifications.schemas import NotificationCreateSchema


def create_notifications(order_id: int, manager_id: int, db: Session = Depends(get_async_session)):
    notification = Notification()
    notification.description = 'Лорем ипсум'
    notification.title = 'Тойота ипсум'
    notification.order_id = order_id
    notification.user_id = manager_id
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification


def get_notification(notification_id: int, user_id: int, db: Session = Depends(get_async_session)):
    notification = db.query(Notification).filter_by(id=notification_id, user_id=user_id).first()
    if not notification:
        raise HTTPException(detail="Notification not found!!!", status_code=status.HTTP_404_NOT_FOUND)
    return notification

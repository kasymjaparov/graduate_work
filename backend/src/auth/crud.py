from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.auth.dependencies import get_admin_user
from src.auth.models import User
from src.database import get_async_session


def get_user(user_id: int, db: Session = Depends(get_async_session)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user_id} not found!!!"
        )
    return user

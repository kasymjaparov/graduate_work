from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.database import get_async_session
from .models import Stage, StageImage


def get_stage(stage_id: int, db: Session = Depends(get_async_session)):
    stage_db_query = db.query(Stage).filter(Stage.id == stage_id)
    stage_db = stage_db_query.first()
    if not stage_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Stage not found!!!"
        )
    return stage_db


def get_stage_image(stage_image_id: int, db: Session = Depends(get_async_session)):
    stage_image_db_query = db.query(Stage).filter(StageImage.id == stage_image_id)
    stage_image_db = stage_image_db_query.first()
    if not stage_image_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="StageImage not found!!!"
        )
    return stage_image_db

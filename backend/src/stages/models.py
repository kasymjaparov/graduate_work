import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String, event,
)
from sqlalchemy.orm import relationship

from src.base import Base
from src.event_listeners import delete_image_from_cloudinary


class Stage(Base):
    __tablename__ = "stage"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))
    title = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    order = relationship("Order", back_populates="stage")
    stage_image = relationship("StageImage", back_populates="stage")


class StageImage(Base):
    __tablename__ = "stage_image"

    id = Column(Integer, primary_key=True, index=True)
    stage_id = Column(Integer, ForeignKey("stage.id"))
    image = Column(String)

    stage = relationship("Stage", back_populates="stage_image")


event.listen(StageImage, 'after_delete', delete_image_from_cloudinary)

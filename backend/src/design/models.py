import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String, event,
)
from sqlalchemy.orm import relationship
from src.base import Base
from src.event_listeners import delete_file_from_cloudinary, delete_image_from_cloudinary


class Design(Base):
    __tablename__ = "design"

    id = Column(Integer, primary_key=True, index=True)
    deadline_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    file = Column(String)
    is_approved = Column(Boolean)
    cancel_reason = Column(String)
    description = Column(String)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    order = relationship("Order", back_populates="design")
    user = relationship("User", back_populates="design")
    sample_image = relationship("SampleImage", back_populates="design")
    comment_design = relationship("CommentDesign", back_populates="design")


event.listen(Design, 'after_delete', delete_file_from_cloudinary)


class SampleImage(Base):
    __tablename__ = "sample_image"

    id = Column(Integer, primary_key=True, index=True)
    image = Column(String)
    description = Column(String)

    design_id = Column(Integer, ForeignKey("design.id", ondelete="CASCADE"))
    design = relationship("Design", back_populates="sample_image")


event.listen(SampleImage, 'after_delete', delete_image_from_cloudinary)


class CommentDesign(Base):
    __tablename__ = "comment_design"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    user = relationship("User", back_populates="comment_design")

    design_id = Column(Integer, ForeignKey("design.id", ondelete="CASCADE"))
    design = relationship("Design", back_populates="comment_design")

    text = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

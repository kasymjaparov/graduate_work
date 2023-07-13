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
from src.event_listeners import delete_doc_file_from_cloudinary


class PreWorkDoc(Base):
    __tablename__ = "pre_work_doc"

    id = Column(Integer, primary_key=True, index=True)
    doc_file = Column(String)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    order = relationship("Order", back_populates="pre_work_doc")
    pre_work_doc_comment = relationship("PreWorkDocComment", back_populates="pre_work_doc")


event.listen(PreWorkDoc, 'after_delete', delete_doc_file_from_cloudinary)


class PreWorkDocComment(Base):
    __tablename__ = "pre_work_doc_comment"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    pre_work_doc_id = Column(Integer, ForeignKey("pre_work_doc.id"))
    text = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    is_approved = Column(Boolean, default=False)

    user = relationship("User", back_populates="pre_work_doc_comment")
    pre_work_doc = relationship("PreWorkDoc", back_populates="pre_work_doc_comment")

import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from src.base import Base


class OrderSignature(Base):
    __tablename__ = "order_signature"

    id = Column(Integer, primary_key=True, index=True)
    signature = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("user.id"))
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="order_signature")
    order = relationship("Order", back_populates="order_signature")


class FinishDocSignature(Base):
    __tablename__ = "finish_doc_signature"

    id = Column(Integer, primary_key=True, index=True)
    signature = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("user.id"))
    finish_doc_id = Column(Integer, ForeignKey("finish_doc.id"))

    user = relationship("User", back_populates="finish_doc_signature")
    finish_doc = relationship("FinishDoc", back_populates="finish_doc_signature")

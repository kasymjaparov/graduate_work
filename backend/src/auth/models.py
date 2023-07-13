import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    Integer,
    String, Table, ForeignKey
)
from sqlalchemy.orm import relationship
from src.design.models import Design
from src.signatures.models import OrderSignature
from src.notifications.models import Notification
from src.auth.enums import Type
from src.base import Base

builder_order_group = Table('builder_order_group', Base.metadata,
                            Column('user_id', Integer, ForeignKey('user.id')),
                            Column('order_id', Integer, ForeignKey('order.id'))
                            )


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    phone_number = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    is_have_signature = Column(Boolean, default=False)
    inn = Column(String(14))
    type = Column(Enum(Type))
    created_at = Column(DateTime,
                        default=datetime.datetime.utcnow)
    pin_code = Column(String)
    last_seen = Column(DateTime)
    client_order = relationship("Order", back_populates="client", foreign_keys="[Order.client_id]",
                                cascade="all, delete-orphan")
    meauser_order = relationship("Order", back_populates="meauser", foreign_keys="[Order.meauser_id]",
                                 cascade="all, delete-orphan")
    designer_order = relationship("Order", back_populates="designer", foreign_keys="[Order.designer_id]",
                                  cascade="all, delete-orphan")
    manager_order = relationship("Order", back_populates="manager", foreign_keys="[Order.manager_id]",
                                 cascade="all, delete-orphan")
    design = relationship("Design", back_populates="user", cascade="all, delete-orphan")
    comment_design = relationship("CommentDesign", back_populates="user", cascade="all, delete-orphan")
    order_signature = relationship("OrderSignature", back_populates="user", cascade="all, delete-orphan")
    finish_doc_signature = relationship("FinishDocSignature", back_populates="user", cascade="all, delete-orphan")
    notification = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    pre_work_doc_comment = relationship("PreWorkDocComment", back_populates="user", cascade="all, delete-orphan")

    orders = relationship("Order", secondary=builder_order_group, back_populates='builders')

import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String, event,
)
from sqlalchemy.orm import relationship

from src.auth.models import builder_order_group
from src.event_listeners import delete_image_from_cloudinary
from src.measurement.models import Measurement
from src.stages.models import Stage
from src.pre_work.models import PreWorkDoc
from src.base import Base
from src.order.enums import Series, Status, RepairTypeEnum


class Order(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("user.id"))
    meauser_id = Column(Integer, ForeignKey("user.id"))
    designer_id = Column(Integer, ForeignKey("user.id"))
    manager_id = Column(Integer, ForeignKey("user.id"))
    reason_of_deny = Column(String)
    address = Column(String)
    series = Column(Enum(Series))
    room_amount = Column(Integer)
    status = Column(Enum(Status))
    is_contract_signed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    doc_text = Column(String)
    square = Column(Float)
    repair_type = Column(Enum(RepairTypeEnum), default=RepairTypeEnum.CAPITAL)

    client = relationship("User", foreign_keys="[Order.client_id]")
    meauser = relationship("User", foreign_keys="[Order.meauser_id]")
    designer = relationship("User", foreign_keys="[Order.designer_id]")
    manager = relationship("User", foreign_keys="[Order.manager_id]")
    design = relationship("Design", back_populates="order", cascade="all, delete-orphan")
    order_room = relationship("OrderRoom", back_populates="order", cascade="all, delete-orphan")
    order_check = relationship("OrderCheck", back_populates="order", cascade="all, delete-orphan")
    finish_doc = relationship("FinishDoc", back_populates="order", cascade="all, delete-orphan")
    order_signature = relationship("OrderSignature", back_populates="order", cascade="all, delete-orphan")
    measurement = relationship("Measurement", back_populates="order", cascade="all, delete-orphan")
    stage = relationship("Stage", back_populates="order", cascade="all, delete-orphan")
    pre_work_doc = relationship("PreWorkDoc", back_populates="order", cascade="all, delete-orphan")
    notification = relationship("Notification", back_populates="order", cascade="all, delete-orphan")

    builders = relationship("User", secondary=builder_order_group, back_populates='orders')

    async def builder_ids(self):
        if self.builders:
            return [builder.id for builder in self.builders]
        return []

    def get_order_images_public_ids(self):
        public_ids_list = []
        for i in self.order_room:
            for j in i.order_image:
                public_id = j.image.split("/")[-1].split(".")[0]
                public_ids_list.append(public_id)
        if self.doc_text:
            public_id = self.doc_text.split("/")[-1].split(".")[0]
            public_ids_list.append(public_id)
        return public_ids_list

    async def order_users(self):
        builders = await self.builder_ids()
        return [self.client_id, self.meauser_id, self.designer_id, self.manager_id] + builders


class OrderRoom(Base):
    __tablename__ = "order_room"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    order = relationship("Order", back_populates="order_room")
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))
    square = Column(Float)
    order_image = relationship("OrderImage", back_populates="order_room", cascade="all, delete-orphan")


class OrderImage(Base):
    __tablename__ = "order_image"

    id = Column(Integer, primary_key=True, index=True)
    order_room_id = Column(Integer, ForeignKey("order_room.id", ondelete="CASCADE"))
    order_room = relationship("OrderRoom", back_populates="order_image")
    image = Column(String)


class OrderCheck(Base):
    __tablename__ = "order_check"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))
    image = Column(String)
    is_approved = Column(Boolean)
    order = relationship("Order", back_populates="order_check")


event.listen(OrderCheck, 'after_delete', delete_image_from_cloudinary)


class FinishDoc(Base):
    __tablename__ = "finish_doc"

    id = Column(Integer, primary_key=True, index=True)
    file = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))
    order = relationship("Order", back_populates="finish_doc")
    finish_doc_signature = relationship("FinishDocSignature", back_populates="finish_doc")

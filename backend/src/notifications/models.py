from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from src.base import Base


class Notification(Base):
    __tablename__ = "notification"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))
    watched = Column(Boolean, default=False)
    title = Column(String)
    description = Column(String)

    user = relationship("User", back_populates="notification")
    order = relationship("Order", back_populates="notification")

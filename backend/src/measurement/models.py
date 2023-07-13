import datetime
import cloudinary.uploader

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String, event,
)
from sqlalchemy.orm import relationship

from src.base import Base
from src.event_listeners import delete_file_from_cloudinary


class Measurement(Base):
    __tablename__ = "measurement"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"))
    file = Column(String)
    comment = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    come_date = Column(DateTime(timezone=True))

    order = relationship("Order", back_populates="measurement")


event.listen(Measurement, 'after_delete', delete_file_from_cloudinary)

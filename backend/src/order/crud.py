from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from src.database import get_async_session
from src.order.models import Order


def get_order(order_id: int, db: Session = Depends(get_async_session)):
    order_db_query = db.query(Order).filter(Order.id == order_id)
    order_db = order_db_query.first()
    if not order_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found!!!"
        )
    return order_db, order_db_query

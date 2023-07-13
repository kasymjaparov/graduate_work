from pydantic import BaseModel

from src.order.schemas.order_image import OrderImageCreate, OrderImageResponse


class OrderRoomBase(BaseModel):
    name: str
    description: str
    square: float

    class Config:
        orm_mode = True


class OrderRoomCreate(OrderRoomBase):
    order_id: int | None = None
    order_image: list[OrderImageCreate]

    class Config:
        schema_extra = {
            "example": {
                "name": "string",
                "description": "string",
                "square": 0,
                "order_image": [
                    {
                        "image": "string"
                    }
                ]
            }
        }


class OrderRoomResponse(OrderRoomBase):
    id: int
    order_image: list[OrderImageResponse]

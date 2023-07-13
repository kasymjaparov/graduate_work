from pydantic import BaseModel


class OrderCheckResponse(BaseModel):
    id: int
    image: str
    order_id: int
    is_approved: bool | None = None

    class Config:
        orm_mode = True

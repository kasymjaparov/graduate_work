from pydantic import BaseModel


class NotificationCreateSchema(BaseModel):
    user_id: int
    order_id: int
    title: str
    description: str

    class Config:
        orm_mode = True


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    order_id: int | None = None
    title: str | None = None
    description: str | None = None
    watched: bool

    class Config:
        orm_mode = True

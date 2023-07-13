from datetime import datetime

from fastapi import UploadFile, File, Form
from pydantic import BaseModel


class MeasurementCreateSchema(BaseModel):
    order_id: int
    come_date: datetime

    class Config:
        orm_mode = True


class MeasurementUploadFileSchema(BaseModel):
    comment: str = Form(...)
    file: UploadFile = File(...)


class MeasurementResponseSchema(BaseModel):
    id: int
    order_id: int
    file: str | None = None
    comment: str | None = None
    come_date: datetime | None = None
    created_at: datetime

    class Config:
        orm_mode = True

import base64
from datetime import datetime

from pydantic import BaseModel, validator

from src.auth.schemas import UserResponse
from src.design.schemas.sample_image import SampleImageCreate, SampleImageSchema


class DesignCreate(BaseModel):
    deadline_date: datetime
    order_id: int

    class Config:
        orm_mode = True


class DesignUpdateSchema(BaseModel):
    description: str
    sample_image: list[SampleImageCreate]
    file: str

    class Config:
        orm_mode = True

    @validator('file')
    def validate_image(cls, value):
        try:
            image_format, base64_value = value.split(',', 1)
            if image_format[-6:] != 'base64':
                raise TypeError
            base64.b64decode(base64_value)
            return value
        except (ValueError, TypeError):
            raise ValueError('Invalid file data')


class DesignSchema(BaseModel):
    id: int
    deadline_date: datetime
    file: str | None = None
    description: str
    order_id: int
    sample_image: list[SampleImageSchema] | None = None

    class Config:
        orm_mode = True


class DesignResponse(BaseModel):
    id: int
    order_id: int
    deadline_date: datetime
    file: str | None = None
    is_approved: bool | None = None
    cancel_reason: str | None = None
    description: str | None = None
    user: UserResponse
    sample_image: list[SampleImageSchema] | None = None

    class Config:
        orm_mode = True


class DesignDeclineSchema(BaseModel):
    cancel_reason: str

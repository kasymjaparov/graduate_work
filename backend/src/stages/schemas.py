import base64

from pydantic import BaseModel, validator
from datetime import datetime


class ImageBase(BaseModel):
    image: str

    class Config:
        orm_mode = True

    @validator('image')
    def validate_image(cls, value):
        try:
            image_format, base64_value = value.split(',', 1)
            if image_format[-6:] != 'base64':
                raise TypeError
            base64.b64decode(base64_value)
            return value
        except (ValueError, TypeError):
            raise ValueError('Invalid image data')


class ImageCreate(ImageBase):
    stage_id: int


class ImageResponse(ImageCreate):
    id: int


class StageCreate(BaseModel):
    title: str
    description: str
    stage_image: list[ImageBase]

    class Config:
        orm_mode = True


class StageImage(BaseModel):
    id: int
    image: str

    class Config:
        orm_mode = True


class StageResponse(BaseModel):
    id: int
    title: str
    description: str
    order_id: int
    created_at: datetime
    stage_image: list[StageImage]

    class Config:
        orm_mode = True

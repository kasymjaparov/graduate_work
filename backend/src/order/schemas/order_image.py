import base64

from pydantic import BaseModel, validator


class OrderImageCreate(BaseModel):
    image: str
    order_room_id: int | None = None

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


class OrderImageResponse(BaseModel):
    id: int
    image: str

    class Config:
        orm_mode = True

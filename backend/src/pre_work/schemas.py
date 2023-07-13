import base64
from datetime import datetime
from pydantic import BaseModel, validator

from src.auth.schemas import UserCommentResponseSchema


class PreWorkDocCreateSchema(BaseModel):
    doc_file: str
    order_id: int

    class Config:
        orm_mode = True

    @validator('doc_file')
    def validate_image(cls, value):
        try:
            image_format, base64_value = value.split(',', 1)
            if image_format[-6:] != 'base64':
                raise TypeError
            base64.b64decode(base64_value)
            return value
        except (ValueError, TypeError):
            raise ValueError('Invalid doc_file data')


class PreWorkDocResponseSchema(BaseModel):
    id: int
    doc_file: str
    order_id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        orm_mode = True


class PreWorkFilterSchema(BaseModel):
    id: int | None = None
    doc_file: str | None = None
    order_id: int | None = None


class PreWorkDocCommentCreateSchema(BaseModel):
    pre_work_doc_id: int
    text: str

    class Config:
        orm_mode = True


class PreWorkDocCommentFilterSchema(BaseModel):
    id: int | None = None
    pre_work_doc_id: int | None = None
    text: str | None = None
    created_at: datetime | None = None
    is_approved: bool | None = None


class PreWorkDocCommentResponseSchema(BaseModel):
    id: int
    pre_work_doc_id: int
    text: str
    created_at: datetime
    is_approved: bool

    class Config:
        orm_mode = True


class CommentCreateSchema(BaseModel):
    text: str

    class Config:
        orm_mode = True


class CommentResponseSchema(BaseModel):
    id: int
    text: str
    created_at: datetime
    user: UserCommentResponseSchema

    class Config:
        orm_mode = True

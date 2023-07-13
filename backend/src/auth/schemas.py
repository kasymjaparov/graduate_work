from datetime import datetime

from pydantic import BaseModel, EmailStr, constr

from src.auth.enums import Type


class RegisterUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=5)
    type: Type


class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=5)


class UserBase(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    inn: str | None = None
    is_have_signature: bool | None = None

    class Config:
        orm_mode = True


class UserResponse(UserBase):
    id: int
    email: EmailStr
    type: Type | None = None
    created_at: datetime | None = None

    class Config:
        orm_mode = True


class UserResponseWithToken(UserResponse):
    access_token: str
    refresh_token: str

    class Config:
        orm_mode = True


class UserFilterSchema(BaseModel):
    id: int | None = None
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    email: EmailStr | None = None
    is_have_signature: bool | None = None
    inn: str | None = None
    type: Type | None = None
    created_at: datetime | None = None
    last_seen: datetime | None = None


class UserCommentResponseSchema(BaseModel):
    id: int
    type: Type
    email: EmailStr

    class Config:
        orm_mode = True

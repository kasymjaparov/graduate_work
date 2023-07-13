from datetime import datetime

from pydantic import BaseModel, Field

from src.auth.schemas import UserResponse
from src.design.schemas.design import DesignResponse
from src.measurement.schemas import MeasurementResponseSchema
from src.order.enums import Series, Status, RepairTypeEnum
from src.order.schemas.order_check import OrderCheckResponse
from src.order.schemas.order_room import OrderRoomCreate, OrderRoomResponse
from src.pre_work.schemas import PreWorkDocResponseSchema
from src.stages.schemas import StageResponse


class OrderBase(BaseModel):
    address: str
    series: Series
    room_amount: int
    square: float

    class Config:
        orm_mode = True


class OrderWithIdSchema(OrderBase):
    id: int


class OrderCreateSchema(OrderBase):
    order_room: list[OrderRoomCreate]


class FinishDocSchema(BaseModel):
    id: int
    file: str | None = None
    created_at: datetime | None = None

    class Config:
        orm_mode = True


class OrderResponseSchema(OrderWithIdSchema):
    reason_of_deny: str | None = None
    created_at: datetime
    status: Status
    order_room: list[OrderRoomResponse]
    client: UserResponse | None = None
    is_contract_signed: bool
    meauser: UserResponse | None = None
    designer: UserResponse | None = None
    manager: UserResponse | None = None
    builders: list[UserResponse] | None = None
    doc_text: str | None = None
    repair_type: RepairTypeEnum | None = None
    design: list[DesignResponse] | None = None
    measurement: list[MeasurementResponseSchema] | None = None
    pre_work_doc: list[PreWorkDocResponseSchema] | None = None
    order_check: list[OrderCheckResponse] | None = None
    stage: list[StageResponse] | None = None
    finish_doc: list[FinishDocSchema] | None = None


class OrderResponseListSchema(OrderWithIdSchema):
    created_at: datetime
    status: Status
    client: UserResponse | None = None


class OrderRetrieveSchema(BaseModel):
    id: int
    client: UserResponse | None = None
    meauser: UserResponse | None = None
    designer: UserResponse | None = None
    manager: UserResponse | None = None
    builders: list[UserResponse] | None = None
    reason_of_deny: str | None = None
    address: str | None = None
    series: Series | None = None
    order_room: list[OrderRoomResponse]
    room_amount: int
    status: Status
    is_contract_signed: bool
    created_at: datetime
    doc_text: str | None = None
    square: float

    class Config:
        orm_mode = True


class OrderFilterSchema(BaseModel):
    id: int | None = None
    client_id: int | None = None
    meauser_id: int | None = None
    designer_id: int | None = None
    manager_id: int | None = None
    reason_of_deny: str | None = None
    address: str | None = None
    series: Series | None = None
    room_amount: int | None = None
    status: Status | None = None
    is_contract_signed: bool | None = None
    created_at: datetime | None = None
    doc_text: str | None = None
    square: float | None = None


class OrderDeclineSchema(BaseModel):
    reason_of_deny: str


class OrderAcceptSchema(BaseModel):
    id: int
    status: Status
    client: UserResponse
    meauser: UserResponse
    designer: UserResponse
    manager: UserResponse
    builders: list[UserResponse]

    class Config:
        orm_mode = True


class OrderDependSchema(BaseModel):
    meauser_id: int = Field(gt=0)
    designer_id: int = Field(gt=0)
    builder_id: list[int] = Field(gt=0)
    repair_type: RepairTypeEnum

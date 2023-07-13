import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

from src.auth.routers.auth import auth_router
from src.auth.routers.users import users_router
from .config import settings
from .design.routers import design_router
from .measurement.routers import measurement_router
from .notifications.routers import notification_router
from .order.routers import order_router, file_router
from .pre_work.routers import pre_work_router
from .stages.routers import stages_router

app = FastAPI()
add_pagination(app)
origins = settings.CLIENT_ORIGIN

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    print(str(process_time))
    return response


app.include_router(auth_router, tags=["Auth"], prefix="/api/auth")
app.include_router(users_router, tags=["Users"], prefix="/api/users")
app.include_router(order_router, tags=["Orders"], prefix="/api/orders")
app.include_router(stages_router, tags=["Stages"], prefix="/api/stages")
app.include_router(design_router, tags=["Designs"], prefix="/api/designs")
app.include_router(notification_router, tags=["Notifications"], prefix="/api/notifications")
app.include_router(measurement_router, tags=["Measurements"], prefix="/api/measurements")
app.include_router(pre_work_router, tags=["PreWork"], prefix="/api/preworks")
app.include_router(file_router, tags=['File'])

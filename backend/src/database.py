from typing import AsyncGenerator

import redis
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from .config import settings

SQLALCHEMY_DATABASE_URL = (
    f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASS}@"
    f"{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
)

async_engine = create_async_engine(SQLALCHEMY_DATABASE_URL, future=True)
async_session_maker = sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)
redis_conn = redis.Redis(host='redis', port=6379, db=0)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

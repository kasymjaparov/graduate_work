from typing import Any

from fastapi import HTTPException, status
from sqlalchemy import select, desc
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.declarative import as_declarative, declared_attr

from src.filters import filter_query


@as_declarative()
class BaseReadOnly:
    id: Any
    __name__: str

    # Generate __tablename__ automatically

    @declared_attr
    def __tablename__(self) -> str:
        return self.__name__.lower()


@as_declarative()
class Base:
    id: Any
    __name__: str

    # Generate __tablename__ automatically

    @declared_attr
    def __tablename__(self) -> str:
        return self.__name__.lower()

    async def save(self, session: AsyncSession):
        """
        :param session:
        :return:
        """
        try:
            session.add(self)
            return await session.commit()
        except SQLAlchemyError as ex:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=repr(ex)
            ) from ex

    async def delete(self, session: AsyncSession):
        """
        :param session:
        :return:
        """
        try:
            await session.delete(self)
            await session.commit()
            return True
        except SQLAlchemyError as ex:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=repr(ex)
            ) from ex

    async def update(self, session: AsyncSession, **kwargs):
        """
        :param session:
        :param kwargs:
        :return:
        """
        for k, v in kwargs.items():
            setattr(self, k, v)
        await self.save(session)

    @classmethod
    async def get(cls, session: AsyncSession, query=None, **kwargs):
        if query is None:
            query = select(cls)
        if kwargs:
            query = query.filter_by(**kwargs)
        result = await session.execute(query)
        instance = result.scalar_one_or_none()
        if not instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f'{cls.__tablename__.title()} not found',
            )
        return instance

    @classmethod
    async def get_all(cls, session: AsyncSession, query=None, filters=None, **kwargs):
        if query is None:
            query = select(cls)
        if filters:
            query = filter_query(cls, query, filters)
        if kwargs:
            query = query.filter_by(**kwargs)
        query = query.order_by(desc(cls.id))
        result = await session.execute(query)
        objs = result.scalars().all()
        return objs

    @classmethod
    async def bulk_create(cls, session: AsyncSession, data):
        objs = [cls(**kwargs) for kwargs in data]
        try:
            session.add_all(objs)
            return await session.commit()
        except SQLAlchemyError as ex:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=repr(ex)
            ) from ex

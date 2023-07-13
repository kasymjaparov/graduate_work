import base64
from typing import List

from fastapi import Depends, HTTPException, status
from fastapi_jwt_auth import AuthJWT
from pydantic import BaseModel

from .auth.models import User
from .config import settings
from .database import get_async_session, redis_conn


class Settings(BaseModel):
    authjwt_algorithm: str = settings.JWT_ALGORITHM
    authjwt_decode_algorithms: List[str] = [settings.JWT_ALGORITHM]
    authjwt_token_location: set = {"cookies", "headers"}
    authjwt_access_cookie_key: str = "access_token"
    authjwt_refresh_cookie_key: str = "refresh_token"
    authjwt_cookie_csrf_protect: bool = False
    authjwt_public_key: str = base64.b64decode(
        settings.JWT_PUBLIC_KEY).decode("utf-8")
    authjwt_private_key: str = base64.b64decode(settings.JWT_PRIVATE_KEY).decode(
        "utf-8"
    )
    redis_host: str = 'redis'
    redis_port: int = 6379
    redis_db: int = 1
    redis_access_token_key_prefix: str = 'access_token:'
    redis_refresh_token_key_prefix: str = 'refresh_token:'
    redis_blacklist_key_prefix: str = 'blacklist:'


@AuthJWT.load_config
def get_config():
    return Settings()


class NotVerified(Exception):
    pass


class UserNotFound(Exception):
    pass


async def require_user(authorize: AuthJWT = Depends(), session=Depends(get_async_session)):
    try:
        authorize.jwt_required()
        user_id = authorize.get_jwt_subject()
        user = await User.get(session, id=int(user_id))
        access_token_key = f"access_token:{user_id}"
        if authorize.get_jti(redis_conn.get(access_token_key)) != authorize.get_raw_jwt()['jti']:
            raise HTTPException(status_code=401, detail='Token expired or invalid')
    except Exception as e:
        error = e.__class__.__name__
        print(error)
        if error == "MissingTokenError":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not logged in"
            )
        if error == "UserNotFound":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="User no longer exist"
            )
        if error == "NotVerified":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Please verify your account",
            )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid or has expired",
        )
    return user

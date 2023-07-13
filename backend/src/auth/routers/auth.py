from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from src import oauth2
from src.auth import schemas, utils
from src.config import settings
from src.database import get_async_session, redis_conn
from src.oauth2 import AuthJWT
from ..models import User

auth_router = APIRouter()
ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN


@auth_router.post("/register", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
async def create_user(
        payload: schemas.RegisterUserSchema, session: AsyncSession = Depends(get_async_session)
):
    user = await User.get_all(session, email=payload.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Account already exist"
        )
    payload.password = utils.hash_password(payload.password)
    new_user = User(**payload.dict())
    await new_user.save(session)
    return new_user


@auth_router.post("/login", response_model=schemas.UserResponseWithToken)
async def login(
        payload: schemas.LoginUserSchema,
        response: Response,
        authorize: AuthJWT = Depends(),
        session=Depends(get_async_session),
):
    user = await User.get(session, email=payload.email)
    if not utils.verify_password(payload.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or Password",
        )
    user.access_token = authorize.create_access_token(
        subject=str(user.id), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN)
    )
    user.refresh_token = authorize.create_refresh_token(
        subject=str(user.id), expires_time=timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN)
    )
    access_keys = redis_conn.keys(f"access_token:{user.id}")
    refresh_keys = redis_conn.keys(f"refresh_token:{user.id}")
    for key in access_keys + refresh_keys:
        redis_conn.delete(key)
    redis_conn.setex(f"access_token:{user.id}", timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN), user.access_token)
    redis_conn.setex(f"refresh_token:{user.id}", timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN), user.refresh_token)
    response.set_cookie(
        "access_token",
        user.access_token,
        ACCESS_TOKEN_EXPIRES_IN * 60,
        ACCESS_TOKEN_EXPIRES_IN * 60,
        "/",
        None,
        True,
        True,
        "none",
    )
    response.set_cookie(
        "refresh_token",
        user.refresh_token,
        REFRESH_TOKEN_EXPIRES_IN * 60,
        REFRESH_TOKEN_EXPIRES_IN * 60,
        "/",
        None,
        True,
        True,
        "none",
    )
    response.set_cookie(
        "logged_in",
        "True",
        ACCESS_TOKEN_EXPIRES_IN * 60,
        ACCESS_TOKEN_EXPIRES_IN * 60,
        "/",
        None,
        True,
        False,
        "none",
    )
    return user


@auth_router.get("/refresh")
async def refresh_token(
        response: Response,
        authorize: AuthJWT = Depends(),
        session=Depends(get_async_session),
):
    try:
        authorize.jwt_refresh_token_required()
        user_id = authorize.get_jwt_subject()
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not refresh access token",
            )
        user = await User.get(session, id=int(user_id))
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="The user belonging to this token no logger exist",
            )
        refresh_token_key = f"refresh_token:{user_id}"
        print(authorize.get_jti(redis_conn.get(refresh_token_key)), 'token_from_redis')
        print(authorize.get_raw_jwt()['jti'], 'user_token')
        print(authorize.get_jti(redis_conn.get(refresh_token_key)) == authorize.get_raw_jwt()['jti'], 'is_equal')
        print(authorize.get_raw_jwt())
        if authorize.get_jti(redis_conn.get(refresh_token_key)) != authorize.get_raw_jwt()['jti']:
            raise HTTPException(status_code=401, detail='Token expired or invalid')
        access_token = authorize.create_access_token(
            subject=str(user.id),
            expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN),
        )
        access_keys = redis_conn.keys(f"access_token:{user.id}")
        for key in access_keys:
            redis_conn.delete(key)
        redis_conn.setex(f"access_token:{user.id}", timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN), access_token)
    except Exception as e:
        error = e.__class__.__name__
        if error == "MissingTokenError":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please provide refresh token",
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    response.set_cookie(
        "access_token",
        access_token,
        ACCESS_TOKEN_EXPIRES_IN * 60,
        ACCESS_TOKEN_EXPIRES_IN * 60,
        "/",
        None,
        True,
        True,
        "none",
    )
    response.set_cookie(
        "logged_in",
        "True",
        ACCESS_TOKEN_EXPIRES_IN * 60,
        ACCESS_TOKEN_EXPIRES_IN * 60,
        "/",
        None,
        True,
        True,
        "none",
    )
    return {"access_token": access_token}


@auth_router.get("/logout", status_code=status.HTTP_200_OK)
def logout(
        response: Response,
        authorize: AuthJWT = Depends(),
        user_id: str = Depends(oauth2.require_user),
):
    authorize.unset_jwt_cookies()
    response.set_cookie(
        "logged_in",
        "",
        -1,
        -1,
        "/",
        None,
        True,
        True,
        "none",
    )

    return {"status": "success"}

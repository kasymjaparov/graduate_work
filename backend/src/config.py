from typing import List

from pydantic import BaseSettings


class Settings(BaseSettings):
    DB_PORT: int
    DB_PASS: str
    DB_USER: str
    DB_NAME: str
    DB_HOST: str
    TEST_DB_NAME: str

    JWT_PUBLIC_KEY: str
    JWT_PRIVATE_KEY: str
    REFRESH_TOKEN_EXPIRES_IN: int
    ACCESS_TOKEN_EXPIRES_IN: int
    JWT_ALGORITHM: str

    CLIENT_ORIGIN: List[str]

    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    CLOUD_NAME: str

    class Config:
        env_file = "./.env"


settings = Settings()

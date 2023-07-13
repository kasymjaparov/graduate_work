import asyncio

import cloudinary
import cloudinary.api
from fastapi import File, UploadFile, HTTPException
from cloudinary.uploader import upload
from starlette import status

from .config import settings

cloudinary.config(
    cloud_name=settings.CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)


# Helper function to delete file from cloudinary
def delete_file(public_id):
    response = cloudinary.api.delete_resources(public_id)
    print("Pre work doc file is deleted", response)


# Helper function to upload file to cloudinary
def upload_file_docx(doc_file):
    response = cloudinary.uploader.upload(doc_file.file, resource_type="raw")
    return response["public_id"]


async def upload_file(file: UploadFile = File(...)):
    response = upload(file.file, resource_type='raw')
    file_url = response.get('secure_url')
    return file_url


async def upload_base64(data: str):
    response = upload(data)
    file_url = response.get('secure_url')
    return file_url


async def upload_images(images: list[dict]):
    async def upload_single_image(image: dict):
        response = await asyncio.to_thread(upload, image.get('image'))
        file_url = response.get('secure_url')
        image['image'] = file_url
        return image
    try:
        urls = await asyncio.gather(*[upload_single_image(image) for image in images])
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    return urls


async def delete_files_after_order_delete(public_ids):
    async def delete_files(public_id):
        print(public_id)
        response = await asyncio.to_thread(cloudinary.api.delete_resources, public_id)
        print(f"File is deleted", response)
        return response
    try:
        responses = await asyncio.gather(
            *[delete_files(public_id) for public_id in public_ids])
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    return responses

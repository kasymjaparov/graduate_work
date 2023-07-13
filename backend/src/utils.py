import datetime
import os

import aiofiles
from fastapi import UploadFile, File


async def save_file(
        path: str,
        file: UploadFile = File(...),
):
    contents = await file.read()
    now = f'{datetime.datetime.utcnow()}'.strip()
    if not os.path.exists(path):
        os.makedirs(path)
    new_file_name = now + file.filename
    full_path = os.path.join(path, new_file_name)
    async with aiofiles.open(full_path, 'wb') as f:
        await f.write(contents)
    return full_path

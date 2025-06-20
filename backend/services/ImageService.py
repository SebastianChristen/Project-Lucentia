


import os
import shutil

from fastapi import HTTPException, UploadFile
from fastapi.responses import FileResponse

async def get_image(image_name: str, image_type: str) -> FileResponse:
    if image_type not in ["profiles", "channels"]:
        raise HTTPException(status_code=400, detail="Invalid image type")
    
    image_path = os.path.join("static/images", image_type, image_name)
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(image_path)

async def save_image(file: UploadFile, image_type: str) -> str:
        if image_type not in ["profiles", "channels"]:
            raise HTTPException(status_code=400, detail="Invalid image type")
        
        upload_dir = os.path.join("static/images", image_type)
        os.makedirs(upload_dir, exist_ok=True)

        file_path = os.path.join(upload_dir, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return file.filename
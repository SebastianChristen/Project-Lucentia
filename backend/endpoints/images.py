from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import FileResponse, JSONResponse
import os

from services import ImageService

router = APIRouter()

@router.get("/profile/{image_name}")
async def get_profile_picture(image_name: str):
   return await ImageService.get_image(image_name, "profiles")

@router.get("/channel/{image_name}")
async def get_profile_picture(image_name: str):
    return await ImageService.get_image(image_name, "channels")


@router.post("/profile/")
async def upload_profile_picture(file: UploadFile = File(...)):
    return await ImageService.save_image(file, "profiles")

@router.post("/channel/")
async def upload_channel_picture(file: UploadFile = File(...)):
    return await ImageService.save_image(file, "channels")
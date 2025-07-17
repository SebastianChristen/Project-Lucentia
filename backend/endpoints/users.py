# endpoints/users.py
from typing import List
from fastapi import APIRouter, Depends
from services import UserService
from services.helpers import JwtHelper
from models import UserRequest, UserResponse

router = APIRouter()


# GET ALL USERS
@router.get("/", response_model=List[UserResponse])
async def get_users():
    return await UserService.get_users()

@router.get("/{user_uuid}", response_model=UserResponse)
async def get_user(user_uuid: str):
    return await UserService.get_user_by_id(user_uuid)

@router.put("/", response_model=UserResponse)
async def update_user(user_request: UserRequest, currentUserPayload: dict = Depends(JwtHelper.get_current_user)):
    return await UserService.update_user(user_request, currentUserPayload)

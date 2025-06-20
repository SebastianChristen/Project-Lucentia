from typing import List
from fastapi import HTTPException
from models import UserEntity, UserRequest, UserResponse
from repositories import UserRepository

# TODO: await for all functions in /me
async def get_user_by_id(uuid: str) -> UserResponse:
    userEntity: UserEntity = await UserRepository.findUserByUuid(uuid)
    return UserResponse(**userEntity)

async def get_users() -> List[UserResponse]:
    users: List[UserEntity] = await UserRepository.findUsers()
    return  [UserResponse(**user) for user in users]

async def update_user(user_request: UserRequest, currentUserPayload) -> UserResponse:
    update_data = {
        "username": user_request.username,
        "status": user_request.status,
        "language": user_request.language,
        "profile_picture": user_request.profile_picture
    }

    # TODO: funktion eibauen, ob filename existiert. wenn nein -> error.

    update_result = await UserRepository.updateUserByUuid(currentUserPayload["sub"], update_data)
    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found") # TODO: statuscode ist irreführend wenn nutzer bereits existiert

    user = await UserRepository.findUserByUuid(currentUserPayload["sub"])
    return UserResponse(**user)
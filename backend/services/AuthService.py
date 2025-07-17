from fastapi import HTTPException
from models import LoginRequest, TokenResponse, UserEntity, UserResponse
from repositories import UserRepository
from services.helpers import JwtHelper
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def signup(login_request: LoginRequest) -> TokenResponse:
    username = login_request.username
    password = login_request.password

    existing_user = await UserRepository.findUserByUsername(username)

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = pwd_context.hash(password)

    new_user = UserEntity(username=username, password=hashed_password).dict() # <-- maybe simpler method using **?
    await UserRepository.saveUser(new_user)

    token = JwtHelper.create_access_token(data={"sub": str(new_user["id"])})  # Convert ObjectId to string

    return {"access_token": token, "token_type": "bearer"} # TODO: format, tokenresponse


async def login(login_request: LoginRequest) -> TokenResponse:
    username = login_request.username
    password = login_request.password

    stored_user = await UserRepository.findUserByUsername(username)

    if not stored_user:
        raise HTTPException(status_code=400, detail="Username not found")

    if not pwd_context.verify(password, stored_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect password")

    token = JwtHelper.create_access_token(data={"sub": str(stored_user["id"])})
    return {"access_token": token, "token_type": "bearer"}


async def me(currentUserPayload):
    stored_user = await UserRepository.findUserByUuid(currentUserPayload["sub"])
    if not stored_user:
        raise HTTPException(status_code=404, detail="User not found")

    return UserResponse(**stored_user);
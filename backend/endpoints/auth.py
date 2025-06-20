from fastapi import APIRouter, Depends
from services import AuthService
from models import LoginRequest, TokenResponse, UserResponse
from services.helpers import JwtHelper

router = APIRouter()


# SIGN UP
@router.post("/signup", response_model=TokenResponse)
async def create_user(login_request: LoginRequest):
    return await AuthService.signup(login_request)

# LOGIN
@router.post("/login", response_model=TokenResponse)
async def login(login_request: LoginRequest):
    return await AuthService.login(login_request)

# CURRENT USER
@router.get("/me", response_model=UserResponse)
async def get_user(currentUserPayload: dict = Depends(JwtHelper.get_current_user)):
    return await AuthService.me(currentUserPayload)

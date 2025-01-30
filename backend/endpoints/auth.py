from fastapi import APIRouter, Depends, Form, HTTPException, status
from models import LoginRequest, User, TokenResponse
from security.utils import create_access_token, get_current_user
from database import get_db
from pymongo.database import Database
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()


# SIGN UP
@router.post("/signup", response_model=TokenResponse)
async def create_user(
    username: str = Form(...),    # Form statt Pydantic-Modell
    password: str = Form(...),    # Password als Form-Daten
    db: Database = Depends(get_db)
):
    existing_user = await db.users.find_one({"username": username})

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_password = pwd_context.hash(password)

    new_user = User(username=username, password=hashed_password)
    await db.users.insert_one(new_user.dict())

    token = create_access_token(data={"sub": username})
    return {"access_token": token, "token_type": "bearer"}

# LOGIN
@router.post("/login")
async def login(
    username: str = Form(...),   # Form statt Pydantic-Modell!
    password: str = Form(...),   # Form statt Pydantic-Modell!
    db: Database = Depends(get_db)
):
    stored_user = await db.users.find_one({"username": username})

    if not stored_user:
        raise HTTPException(status_code=400, detail="Username not found")

    if not pwd_context.verify(password, stored_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect password")

    token = create_access_token(data={"sub": username})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def read_users_me(user: dict = Depends(get_current_user)):
    return {"username": user["sub"]}

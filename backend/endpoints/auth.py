from fastapi import APIRouter, Depends, HTTPException, status
from models import User, TokenResponse
from security.utils import create_access_token, get_current_user
from database import get_db
from pymongo.database import Database

router = APIRouter()


# SIGN UP
@router.post("/signup", response_model=TokenResponse)
async def create_user(username: str, db: Database = Depends(get_db)):
    existing_user = await db.users.find_one({"username": username})

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = User(username=username)
    await db.users.insert_one(new_user.dict())

    token = create_access_token(data={"sub": username})
    return {"access_token": token, "token_type": "bearer"}

# LOGIN
@router.post("/login", response_model=TokenResponse)
async def login(username: str, db: Database = Depends(get_db)):
    print("user:::::::",username)
    stored_user = await db.users.find_one({"username": username})

    print("stored user:::::::",stored_user)
    if not stored_user:
        raise HTTPException(status_code=400, detail="username not found")

    token = create_access_token(data={"sub": username})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def read_users_me(user: dict = Depends(get_current_user)):
    return {"username": user["sub"]}

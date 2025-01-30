from fastapi import APIRouter, Depends, HTTPException, status
from models import User, TokenResponse
from security.utils import create_access_token, get_current_user
from database import get_db
from pymongo.database import Database

router = APIRouter()


# SIGN UP
@router.post("/signup", response_model=TokenResponse)
async def create_user(user: User, db: Database = Depends(get_db)):
    existing_user = await db.users.find_one({"username": user.username})
    existing_user = existing_user["username"]
    print("existing user:::::::",existing_user)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    db.users.insert_one(user.dict())

    token = create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

# LOGIN
@router.post("/login", response_model=TokenResponse)
async def login(user: User, db: Database = Depends(get_db)):
    stored_user = await db.users.find_one({"username": user.username})
    stored_user =  stored_user["username"]
    print("stored user:::::::",stored_user)
    if not stored_user:
        raise HTTPException(status_code=400, detail="Invalid username")

    token = create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def read_users_me(user: dict = Depends(get_current_user)):
    return {"username": user["sub"]}

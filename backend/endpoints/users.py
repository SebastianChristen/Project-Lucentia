# endpoints/users.py
from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database
from models import User
from typing import List
from database import get_db

router = APIRouter()


# GET ALL
@router.get("/", response_model=List[User])
async def get_users(db: Database = Depends(get_db)):
    users = list(db.users.find())
    return [User(**usr) for usr in users]


# POST ONE
@router.post("/", response_model=User)
async def create_user(user: User, db: Database = Depends(get_db)):
    db.users.insert_one(user.dict())
    return user

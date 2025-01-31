# endpoints/users.py
from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database
from typing import List
from database import get_db
import security.utils as utils
from models import User

router = APIRouter()


# GET ALL
@router.get("/", response_model=List[User])
async def get_users(db: Database = Depends(get_db)):
    users = await db.users.find().to_list(None)
    return [User(**usr) for usr in users]

# GET ONE BY UUID
@router.get("/{uuid}", response_model=User)
async def get_user(uuid: str, db: Database = Depends(get_db)):
    user = await db.users.find_one({"id": uuid})
    return User(**user)

# new users are now created in auth, so i removed this endpoint

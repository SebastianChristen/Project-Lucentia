# endpoints/users.py
from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database
from typing import List
from database import get_db
import security.utils as utils
from models import User, Token

router = APIRouter()


# GET ALL
@router.get("/", response_model=List[User])
async def get_users(db: Database = Depends(get_db)):
    users = db.users.find().to_list(None)
    return [User(**usr) for usr in users]

# GET ONE BY UUID
@router.get("/{uuid}", response_model=User)
async def get_user(uuid: str, db: Database = Depends(get_db)):
    user = await db.users.find_one({"id": uuid})
    return User(**user)

# POST ONE
@router.post("/", response_model={}) # returns just the token
async def create_user(user: User, db: Database = Depends(get_db)):
    # store user like always
    db.users.insert_one(user.dict())

    # Create and store token in other collection
    token = utils.create_access_token(data={"sub": user.username})
    db_token = Token(username=user.username, token=token)
    db.token.insert_one(db_token.dict())
    return {"lucen-token": token}


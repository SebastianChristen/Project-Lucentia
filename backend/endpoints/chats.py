# endpoints/messages.py
from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database
from models import Message
from typing import List
from database import get_db

router = APIRouter()


# GET ALL
@router.get("/", response_model=List[Message])
async def get_messages(db: Database = Depends(get_db)):
    messages = list(db.messages.find())
    return [Message(**msg) for msg in messages]

# GET ALL
@router.get("/", response_model=List[Message])
async def get_messages(db: Database = Depends(get_db)):
    messages = list(db.messages.find())
    return [Message(**msg) for msg in messages]

# POST ONE
@router.post("/", response_model=Message)
async def create_message(message: Message, db: Database = Depends(get_db)):
    db.messages.insert_one(message.dict())
    return message

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


# # GET ONE
# @router.get("/{message_id}", response_model=Message)
# async def get_message(message_id: str, db: Database = Depends(get_db)):
#     message = db.messages.find_one({"id": message_id})
#     if not message:
#         raise HTTPException(status_code=404, detail="Message not found")
#     return Message(**message)


# # POST
# @router.post("/", response_model=Message)
# async def create_message(message: Message, db: Database = Depends(get_db)):
#     db.messages.insert_one(message.dict())
#     return message

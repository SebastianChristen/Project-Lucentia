# endpoints/chats.py
from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database
from models import Chat, Message
from typing import List
from database import get_db

router = APIRouter()


# GET EVERYTHING
@router.get("/", response_model=List[Chat])
async def get_chats(db: Database = Depends(get_db)):
    chats = list(db.chats.find())
    print(chats)
    return [Chat(**chat) for chat in chats]


# GET ALL MESSAGES OF A SPECIFIED CHAT
@router.get("/{id}", response_model=List[Message])
async def get_chats(id: str, db: Database = Depends(get_db)):
    chat = db.chats.find_one({"id": id}, {"messages": 1})
    return [Message(**msg) for msg in chat.get("messages", [])]

# POST ONE
@router.post("/", response_model=Chat)
async def create_chat(chat: Chat, db: Database = Depends(get_db)):
    db.chats.insert_one(chat.dict())
    return chat


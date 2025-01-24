# endpoints/chats.py
from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database
from models import Chat, Message
from typing import List
from database import get_db
from .users import get_user

router = APIRouter()


# GET EVERYTHING
@router.get("/", response_model=List[Chat])
async def get_chats(db: Database = Depends(get_db)):
    chats = await db.chats.find().to_list(None)
    print(chats)
    return [Chat(**chat) for chat in chats]


# GET A SPECIFIED CHAT
@router.get("/{id}", response_model=Chat)
async def get_chats(id: str, db: Database = Depends(get_db)):
    chat = await db.chats.find_one({"id": id})

    # Translate goofy ahh UUIDs to usernames
    for message in chat["messages"]:
        user_data = await get_user(uuid=message["sender"], db=db)
        message["sender"] = user_data.username

    return Chat(**chat)

# POST ONE
@router.post("/", response_model=Chat)
async def create_chat(chat: Chat, db: Database = Depends(get_db)):
    db.chats.insert_one(chat.dict())
    return chat


# endpoints/chats.py
from fastapi import APIRouter, Body, Depends, HTTPException
from pymongo.database import Database
from .users import get_user
from models import Chat, Message
from typing import List
from database import get_db
from security.utils import get_current_user

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
@router.post("/{chat_id}", response_model=Chat)
async def create_chat(chat_id: str,  message: dict = Body(...), db: Database = Depends(get_db), user=Depends(get_current_user)):
    message["sender"] = user["sub"]
    await db.chats.update_one(
        {"id": chat_id},
        {"$push": {"messages": message}}
    )
    updated_chat = await db.chats.find_one({"id": chat_id})
    return updated_chat


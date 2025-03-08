# endpoints/chats.py
from fastapi import APIRouter, Body, Depends, HTTPException, Query
from pymongo.database import Database
from .users import get_user
from models import Chat, Message
from typing import List
from database import get_db
from security.utils import get_current_user

router = APIRouter()


# TODO: move to service
def translate(message, language: str):
    message = message + " in " + language
    return message


# GET EVERYTHING
@router.get("/", response_model=List[Chat])
async def get_chats(db: Database = Depends(get_db)):
    chats = await db.chats.find().to_list(None)
    print(chats)
    return [Chat(**chat) for chat in chats]


# GET A SPECIFIED CHAT
@router.get("/{id}", response_model=Chat)
async def get_chats(id: str, language: str = Query(...), db: Database = Depends(get_db)):
    chat = await db.chats.find_one({"id": id})

    # Translate goofy ahh UUIDs to usernames
    for message in chat["messages"]:
        user_data = await get_user(uuid=message["sender"], db=db)
        message["sender"] = user_data.username

        if message.get("translations") and language in message.get("translations"):
            message["message"] = message["translations"][language]
        else:
            message["message"] = message["message"]

    return Chat(**chat)

# POST ONE
@router.post("/{chat_id}", response_model=Chat)
async def create_chat(chat_id: str, message: dict = Body(...), db: Database = Depends(get_db), user=Depends(get_current_user)):
    message["sender"] = user["sub"]
    message_obj = Message(**message)

    # TODO: move to service
    message_obj.translations = {
        "de": translate(message_obj.message, "German"),
        "it": translate(message_obj.message, "Italian"),
        "nl": translate(message_obj.message, "Dutch"),
        "es": translate(message_obj.message, "Spanish"),
        "fr": translate(message_obj.message, "French"),
    }

    await db.chats.update_one(
        {"id": chat_id},
        {"$push": {"messages": message_obj.dict()}}
    )
    updated_chat = await db.chats.find_one({"id": chat_id})
    return updated_chat


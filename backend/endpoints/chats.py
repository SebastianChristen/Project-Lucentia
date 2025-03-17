# endpoints/chats.py
from fastapi import APIRouter, Body, Depends, HTTPException, Query
from pymongo.database import Database
from .users import get_user
from models import ChannelsResponse, Chat, Message, MessageRequest
from typing import List, Optional
from database import get_db
from security.utils import get_current_user
from translation.translate_message import translate_message

router = APIRouter()



# GET EVERYTHING
@router.get("/", response_model=List[ChannelsResponse])
async def get_chats(db: Database = Depends(get_db)):
    channels = await db.chats.find().to_list(None)
    return [ChannelsResponse(**channel) for channel in channels]


# GET A SPECIFIED CHAT
@router.get("/{id}", response_model=Chat)
async def get_chats(id: str, language: Optional[str] = Query(None), db: Database = Depends(get_db)):
    chat = await db.chats.find_one({"id": id})

    for message in chat["messages"]:
        # Translate goofy ahh UUIDs to usernames
        user_data = await get_user(uuid=message["sender"], db=db)
        message["sender"] = user_data.username

        # Translate message to specified language
        if language and message.get("translations") and language in message.get("translations"):
            message["message"] = message["translations"][language]
        else:
            message["message"] = message["message"]

    return Chat(**chat)

# POST ONE
@router.post("/{chat_id}", response_model=Chat)
async def create_chat(chat_id: str, message_request: MessageRequest, db: Database = Depends(get_db), user=Depends(get_current_user)):
    message = message_request.dict()
    message["sender"] = user["sub"]
    message_obj = Message(**message)

    # TODO: move to service
    message_obj.translations = {
        "de": translate_message(message_obj.message, "German"),
        "it": translate_message(message_obj.message, "Italian"),
        "nl": translate_message(message_obj.message, "Dutch"),
        "es": translate_message(message_obj.message, "Spanish"),
        "fr": translate_message(message_obj.message, "French"),
        "en": translate_message(message_obj.message, "English"),
    }

    await db.chats.update_one(
        {"id": chat_id},
        {"$push": {"messages": message_obj.dict()}}
    )
    updated_chat = await db.chats.find_one({"id": chat_id})
    return updated_chat


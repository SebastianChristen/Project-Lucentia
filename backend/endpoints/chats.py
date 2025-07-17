# endpoints/chats.py
from fastapi import APIRouter, Depends
from services import ChannelService
from models import ChannelsResponse, ChatResponseFull, MessageRequest, ChannelsRequest
from typing import List
from services.helpers.JwtHelper import get_current_user

router = APIRouter()

# GET List of Channels
@router.get("/", response_model=List[ChannelsResponse])
async def get_all_channels() -> List[ChannelsResponse]:
    return await ChannelService.getAll()

# POST a new Channel
@router.post("/", response_model=ChannelsResponse)
async def create_channel(channel_request: ChannelsRequest):
    return await ChannelService.saveChannel(channel_request)

# GET A SPECIFIED CHAT
@router.get("/{uuid}", response_model=ChatResponseFull)
async def get_chat(uuid: str) -> ChatResponseFull:
    return await ChannelService.getFullChannel(uuid)

# create & append message to channel
@router.post("/{channel_uuid}", response_model=ChatResponseFull)
async def send_message(channel_uuid: str, message_request: MessageRequest, user=Depends(get_current_user)):
    return await ChannelService.saveMessage(channel_uuid, message_request, user)

# Update an existing message
@router.put("/{message_uuid}") # todo: types
async def update_message(message_uuid: str, message_request: MessageRequest, user=Depends(get_current_user)):
    return await ChannelService.updateMessage(message_uuid, message_request, user)


# DELETE a message
@router.delete("/{message_uuid}") # todo: types
async def delete_message(message_uuid: str, user=Depends(get_current_user)):
    return await ChannelService.deleteMessage(message_uuid, user)



from http.client import HTTPException
from typing import List

from fastapi import Depends
from services.helpers.JwtHelper import get_current_user
from models import ChannelEntity, ChannelsRequest, ChannelsResponse, ChatResponseFull, MessageEntity, MessageInChat, MessageRequest, UserEntity, UserInChat
from repositories import ChannelRepository, MessageRepository, UserRepository
from services.helpers.TranslationHelper import translate_message


async def getAll() -> List[ChannelsResponse]:
    channels = await ChannelRepository.findAllChannels()
    return [ChannelsResponse(**channel) for channel in channels]

async def getFullChannel(uuid: str) -> ChatResponseFull:
    channel: ChannelEntity = await ChannelRepository.findChannelByUuid(uuid)
    messages: List[MessageInChat] = []
    members: List[UserInChat] = []

    for message_uuid in channel["messages"]:
        messageEntity: MessageEntity = await MessageRepository.findMessageByUuid(message_uuid)
        messageEntity["sender"] = await UserRepository.findUserByUuid(messageEntity["sender"]) # TODO
        # messageEntity["sender"]["profile_picture"] = "/images/profile/"+messageEntity["sender"].get("profile_picture")
        messages.append(MessageInChat(**messageEntity))

    for member_uuid in channel["members"]:
        memberEntity: UserEntity = await UserRepository.findUserByUuid(member_uuid)
        members.append(UserInChat(**memberEntity))

    channel["messages"] = messages  # Override the messages field
    channel["members"] = members  # Override the members field

    return ChatResponseFull(**channel)

async def saveMessage(channel_uuid: str, message_request: MessageRequest, user=Depends(get_current_user)) -> ChatResponseFull:
    message = message_request.dict()
    message["sender"] = user["sub"]
    message_obj = MessageEntity(**message)
    message_obj.translations = {
        "de": translate_message(message_obj.message, "German"),
        "en": translate_message(message_obj.message, "English"),
        "es": translate_message(message_obj.message, "Spanish"),
        "fr": translate_message(message_obj.message, "French"),
        "it": translate_message(message_obj.message, "Italian"),
        "nl": translate_message(message_obj.message, "Dutch"),
        "ru": translate_message(message_obj.message, "Russian"),
        "jp": translate_message(message_obj.message, "Japanese")
    }

    newMessageEntity: MessageEntity = await MessageRepository.saveMessage(message_obj.dict()) # creates message in message collection
    newMessageUuid: str = newMessageEntity.id

    await ChannelRepository.appendMessage(channel_uuid, newMessageUuid) # appends uuid to Channel collection
    return await getFullChannel(channel_uuid)


# TODO: Viel duplicate code wie bei POST
# TODO: Note: This code is never called in frontend. is out-of-date.
async def updateMessage(messageUuid: str, message_request: MessageRequest, user=Depends(get_current_user)):
    message = message_request.message

    # Check if sender-uuid is same as user["sub"]
    oldMessage = await MessageRepository.findMessageByUuid(messageUuid)
    if not oldMessage["sender"] == user["sub"]:
        raise HTTPException(status_code=403, detail="Not the author!")

    translations = {
        "de": translate_message(message, "German"),
        "it": translate_message(message, "Italian"),
        "nl": translate_message(message, "Dutch"),
        "es": translate_message(message, "Spanish"),
        "fr": translate_message(message, "French"),
        "en": translate_message(message, "English"),
    }

    return await MessageRepository.updateMessage(messageUuid, message, translations) # updates message in message collection



# TODO: might be broken
async def saveChannel(channel_request: ChannelsRequest) -> ChannelEntity:
    data = channel_request.dict()
    data["messages"] = []
    new_channel = ChannelEntity(**data)

    newly_created_channel = await ChannelRepository.saveChannel(new_channel)


    return newly_created_channel




# Delete Messages
async def deleteMessage(messageUuid: str, user=Depends(get_current_user)):
    # Check if sender-uuid is same as user["sub"]
    oldMessage = await MessageRepository.findMessageByUuid(messageUuid)
    if not oldMessage["sender"] == user["sub"]:
        raise HTTPException(status_code=403, detail="Not the author!")

    await ChannelRepository.removeMessage(messageUuid) # remove uuid to Channel collection

    return await MessageRepository.deleteMessage(messageUuid)

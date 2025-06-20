from typing import Dict, List
import uuid
import time
from pydantic import BaseModel, Field

class MessageEntity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    sender: str
    message: str
    sent_at: int = Field(default_factory=lambda: int(time.time() * 1000))
    translations: Dict[str, str] = Field(default_factory=dict)

class ChannelEntity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    picture: str = Field(default="default.png")
    members: List[str]
    messages: List[str]

class UserEntity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    username: str
    password: str
    status: str = Field(default="offline")
    language: str = Field(default="en")
    profile_picture: str = Field(default="default.png")


# TODO: identical to UserResponse. could be refactored away
class UserInChat(BaseModel):
    id: str
    username: str
    status: str
    language: str
    profile_picture: str

class MessageInChat(BaseModel):
    id: str
    message: str
    sent_at: int
    sender: UserInChat
    translations: Dict[str, str]

class ChatResponseFull(BaseModel):
    id: str
    name: str
    picture: str
    members: List[UserInChat]
    messages: List[MessageInChat]




# TODO: look into usage (think it is only used in arrays, never single) except POST channel??
class ChannelsResponse(BaseModel):
    id: str
    name: str
    picture: str

class ChannelsRequest(BaseModel):
    name: str
    members: List[str]
    picture: str = Field(default="default.png")


class UserResponse(BaseModel):
    id: str
    username: str
    status: str
    language: str
    profile_picture: str

class UserRequest(BaseModel):
    username: str
    status: str
    language: str
    profile_picture: str = Field(default="default.png")


# Login Request Model
class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class MessageRequest(BaseModel):
    message: str

class MessageUpdateRequest(BaseModel):
    uuid: str
    message: str

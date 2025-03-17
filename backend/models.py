from typing import Dict, List, Optional
import uuid
import time
from pydantic import BaseModel, Field

class Message(BaseModel):
    sender: str
    message: str
    sent_at: int = Field(default_factory=lambda: int(time.time() * 1000))
    translations: Dict[str, str] = Field(default_factory=dict)

class Chat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    members: List[str]
    messages: List[Message] = Field(default_factory=list)

class ChannelsResponse(BaseModel):
    id: str
    name: str
    members: List[str]

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    username: str
    password: Optional[str] = Field(default="")
    status: Optional[str] = Field(default="offline")

# Login Request Model
class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class MessageRequest(BaseModel):
    message: str
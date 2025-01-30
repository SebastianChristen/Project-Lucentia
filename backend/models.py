from typing import List, Optional
import uuid
import time
from pydantic import BaseModel, Field

class Message(BaseModel):
    sender: str
    message: str
    sent_at: float = Field(default_factory=lambda: time.time())

class Chat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    members: List[str]
    messages: List[Message] = Field(default_factory=list)

class User(BaseModel):
    id: uuid.UUID = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    username: str
    status: Optional[str] = Field(default="offline")

class Token(BaseModel):
    username: str
    token: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
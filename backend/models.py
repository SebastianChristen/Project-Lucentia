import uuid
import time
from pydantic import BaseModel, Field

class Message(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    sender: str
    receivers: list[str]
    message: str
    sent_at: float = Field(default_factory=lambda: time.time())

class Account(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str
    status: str
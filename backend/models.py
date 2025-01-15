import uuid
import time
from pydantic import BaseModel, Field

class Message(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    sender: str
    message: str
    sent_at: float = Field(default_factory=lambda: time.time())

class User(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str
    status: str
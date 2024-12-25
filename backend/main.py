# main.py
from fastapi import FastAPI
from endpoints.messages import router as messages_router

app = FastAPI()

app.include_router(messages_router, prefix="/messages", tags=["messages"] ) # endpoints/messages.py

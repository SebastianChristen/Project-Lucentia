# main.py
from fastapi import FastAPI
from pymongo import MongoClient
from endpoints.messages import router as messages_router

app = FastAPI()

client = MongoClient("mongodb://mongodb:27017")
db = client.lucentia # Name vor Datebank lul

def get_db():
    return db

app.include_router(messages_router, prefix="/messages", tags=["messages"])

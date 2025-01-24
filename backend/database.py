from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://mongodb:27017")
db = client.lucentia # Name vor Datebank lul

def get_db():
    return db

from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://mongodb:27017")
db = client.chatapp # Name von der datenbank

def get_db():
    return db

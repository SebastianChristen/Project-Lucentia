from pymongo import MongoClient

client = MongoClient("mongodb://mongodb:27017")
db = client.lucentia # Name vor Datebank lul

def get_db():
    return db
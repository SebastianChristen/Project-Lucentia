from typing import List
from pymongo.database import Database

from database import get_db
from models import UserEntity

db: Database = get_db()

async def findUserByUuid(uuid: str) -> UserEntity:
    userEntity: UserEntity = await db.users.find_one({"id": uuid})
    return userEntity

async def findUserByUsername(username: str) -> UserEntity:
    userEntity: UserEntity = await db.users.find_one({"username": username})
    return userEntity

async def findUsers() -> List[UserEntity]:
    users: List[UserEntity] = await db.users.find().to_list(None)
    return users

async def updateUserByUuid(uuid: str, payload ) -> any: #TODO: Type all variables (payload)
    result = await db.users.update_one({"id": uuid}, {"$set": payload})
    return result

async def saveUser(newUser: UserEntity) -> any:
    result = await db.users.insert_one(newUser)
    return result

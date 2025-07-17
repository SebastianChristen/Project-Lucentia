from pymongo.database import Database

from database import get_db
from models import MessageEntity

db: Database = get_db()

async def findMessageByUuid(uuid: str) -> MessageEntity:
    messageEntity: MessageEntity = await db.messages.find_one({"id": uuid})
    return messageEntity


# return: retuns the newly created messageEntity
async def saveMessage(newMessage: MessageEntity) -> MessageEntity:
    result: any = await db.messages.insert_one(newMessage)
    inserted_id = result.inserted_id

    created_message = await db.messages.find_one({"_id": inserted_id})
    return MessageEntity(**created_message)

async def updateMessage(messageUuid: str, message: str, translations: dict) -> any: # todo: typen
    result = await db.messages.update_one(
        {"id": messageUuid},
        {"$set": {"message": message, "translations": translations}}
    )
    return str(result) # todo: typen

async def deleteMessage(messageUuid: str) -> any:
    result = await db.messages.delete_one(
         {"id": messageUuid}
    )
    return str(result) # todo: typen

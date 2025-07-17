from typing import List
from pymongo.database import Database

from database import get_db
from models import ChannelEntity

db: Database = get_db()

async def findAllChannels() -> List[ChannelEntity]:
    channelEntities: List[ChannelEntity] = await db.channels.find().to_list()
    return channelEntities

async def findChannelByUuid(uuid: str) -> ChannelEntity:
    channelEntity: ChannelEntity = await db.channels.find_one({"id": uuid})
    return channelEntity

async def appendMessage(channel_uuid: str, message_uuid: str) -> any:
    result: any =  await db.channels.update_one({"id": channel_uuid},{"$push": {"messages": message_uuid}})
    return result

# messageUuid aus array entfernen:
async def removeMessage(message_uuid: str) -> any:
    result = await db.channels.update_many({}, {"$pull": {"messages": message_uuid}})
    return result

async def saveChannel(newChannel: ChannelEntity) -> ChannelEntity:
    result = await db.channels.insert_one(newChannel.dict())
    inserted_id = result.inserted_id

    created_channel = await db.channels.find_one({"_id": inserted_id})
    return ChannelEntity(**created_channel)


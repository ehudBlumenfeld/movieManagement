from pymongo import MongoClient
from bson import ObjectId


class subscriptionDAL:
    def __init__(self):
        self.__mongo_client = MongoClient(port=27017)
        self.__db = self.__mongo_client["moviesManagement"]

    def getSubscriptions(self):
        return self.__db["subscriptions"].find({})

    def getSubscription(self, id):
        return self.__db["subscriptions"].find_one(
            {"_id": ObjectId(id)})

    def addSubscription(self, subscription):
        self.__db["subscriptions"].insert_one(subscription)
        return str(subscription["_id"])

    def deleteSubscription(self, id):
        self.__db["subscriptions"].delete_one({'_id': ObjectId(id)})

    def updateSubscription(self, id, subscription):
        self.__db["subscriptions"].update_one(
            {'_id': ObjectId(id)}, {"$set": subscription})

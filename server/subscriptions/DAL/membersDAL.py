import requests
from pymongo import MongoClient
from bson import ObjectId


class MembersDAL:
    def __init__(self):
        self.__mongo_client = MongoClient(port=27017)
        self.__db = self.__mongo_client["moviesManagement"]

    def getMembersFromWS(self):
        resp = requests.get("https://jsonplaceholder.typicode.com/users")
        return resp.json()

    def getMembersFromDB(self):
        return self.__db["members"].find({})

    def getMember(self, id):
        member = self.__db["members"].find_one({"_id": ObjectId(id)})
        return member

    def addMember(self, member):
        self.__db["members"].insert_one(member)
        return str(member["_id"])

    def deleteMember(self, id):
        self.__db["members"].delete_one({'_id': ObjectId(id)})

    def updateMember(self, id, member):
        self.__db["members"].update_one(
            {'_id': ObjectId(id)}, {"$set": member})

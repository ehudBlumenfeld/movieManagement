from pymongo import MongoClient
from bson import ObjectId


class UsersLoginDAL:
    def __init__(self):
        self.__mongo_client = MongoClient(port=27017)
        self.__db = self.__mongo_client["moviesManagement"]

    def getUsersLogin(self):
        return self.__db["users"].find({})

    def getUserLogin(self, id):
        user = self.__db["users"].find_one({"_id": ObjectId(id)})
        if user is not None:
            return user
        else:
            return False

    def addUserLogin(self, user):
        self.__db["users"].insert_one(user)
        return str(user["_id"])

    def deleteUserLogin(self, id):
        self.__db["users"].delete_one({'_id': ObjectId(id)})
        return "DELETED !"

    def updateUserLogin(self, id, user):
        self.__db["users"].update_one(
            {'_id': ObjectId(id)}, {"$set": user})
        return "UPDATED !!!"

import json
import sys
import os


class UsersDAL:
    def __init__(self):
        self.filePath = r"C:\fullStuck\projects\movies_management\server\cinemaWS\DATA\users.json"

    def getAllUsers(self):
        with open(os.path.join(sys.path[0], self.filePath), "r")as f:
            data = json.load(f)
            f.close()
        return data

    def getUser(self, id):
        users = list(UsersDAL.getAllUsers(self)["users"])
        return list(filter(lambda x: x["id"] == id, users))

    def updateDeleteAddUser(self, obj, status):
        with open(os.path.join(sys.path[0], self.filePath), 'w')as f:
            json.dump(obj, f)
            f.close()
        return status

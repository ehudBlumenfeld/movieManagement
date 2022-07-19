import json
import sys
import os


class PermissionsDAL:
    def __init__(self):

        self.filePath = "DATA\permissions.json"

    def getAllPermissions(self):
        with open(os.path.join(sys.path[0], self.filePath), "r")as f:
            data = json.load(f)
            f.close()
        return data

    def getPermission(self, id):
        permissions = list(PermissionsDAL.getAllPermissions(self)[
            "permissions"])
        return list(filter(lambda x: x["id"] == id, permissions))

    def updateDeleteAddPermission(self, obj, status):
        with open(os.path.join(sys.path[0], self.filePath), 'w')as f:
            json.dump(obj, f)
            f.close()
        return status

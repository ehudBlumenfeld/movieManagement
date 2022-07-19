from DAL.permissionsDAL import PermissionsDAL


class PermissionsBL:
    def __init__(self):
        self.__permission_dal = PermissionsDAL()

    def getAllPermissions(self):
        return list(self.__permission_dal.getAllPermissions()["permissions"])

    def getPermission(self, id):
        return self.__permission_dal.getPermission(id)

    def addPermission(self, newPermission):
        permissions = PermissionsBL.getAllPermissions(self)
        permissions.append(newPermission)
        obj = {"permissions": permissions}
        return self.__permission_dal.updateDeleteAddPermission(obj, "ADDED !!!")

    def updatePermission(self, obj, id):
        permissions = PermissionsBL.getAllPermissions(self)
        count = 0
        isID = False
        for permission in permissions:
            if(permission["id"] == id):
                isID = True
                break
            count += 1
        if (isID == True):
            permissions[count] = obj
            objj = {"permissions": permissions}
            return self.__permission_dal.updateDeleteAddPermission(objj, "Updated!!!")
        else:
            return "There is no such ID in the system !"

    def deletePermissions(self, id):
        permissions = PermissionsBL.getAllPermissions(self)
        count = 0
        isID = False
        for permission in permissions:
            if(permission["id"] == id):
                isID = True
                break
            count += 1
        if (isID == True):
            permissions.pop(count)
            objj = {"permissions": permissions}
            return self.__permission_dal.updateDeleteAddPermission(objj, "Deleted!!!")
        else:
            return "There is no such ID in the system !"

from DAL.usersDAL import UsersDAL


class UsersBL:
    def __init__(self):
        self.__users_dal = UsersDAL()

    def getAllUsers(self):
        return list(self.__users_dal.getAllUsers()["users"])

    def getUser(self, id):
        return self.__users_dal.getUser(id)

    def addUser(self, newUser):
        users = UsersBL.getAllUsers(self)
        users.append(newUser)
        obj = {"users": users}
        return self.__users_dal.updateDeleteAddUser(obj, "ADDED !!!")

    def updateUser(self, obj, id):
        users = UsersBL.getAllUsers(self)
        count = 0
        isID = False
        for user in users:
            if(user["id"] == id):
                isID = True
                break
            count += 1
        if (isID == True):
            users[count] = obj
            objj = {"users": users}
            return self.__users_dal.updateDeleteAddUser(objj, "Updated!!!")
        else:
            return "There is no such ID in the system !"

    def deleteUser(self, id):
        users = UsersBL.getAllUsers(self)
        count = 0
        isID = False
        for user in users:
            if(user["id"] == id):
                isID = True
                break
            count += 1
        if (isID == True):
            users.pop(count)
            objj = {"users": users}
            return self.__users_dal.updateDeleteAddUser(objj, "Deleted!!!")
        else:
            return "There is no such ID in the system !"

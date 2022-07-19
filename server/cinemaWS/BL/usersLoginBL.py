from DAL.usersLoginDAL import UsersLoginDAL


class UsersLoginBL:
    def __init__(self):
        self.__usersLogin_dal = UsersLoginDAL()

    def getUsersLogin(self):
        return list(self.__usersLogin_dal.getUsersLogin())

    def getUserLogin(self, id):
        return self.__usersLogin_dal.getUserLogin(id)

    def addUserLogin(self, obj):
        newUserLogin = {}
        newUserLogin["username"] = obj["username"]
        newUserLogin["password"] = obj["password"]
        id = self.__usersLogin_dal.addUserLogin(newUserLogin)
        return id

    def updateUserLogin(self, id, obj):
        usersLogin = self.__usersLogin_dal.getUsersLogin()
        isID = False
        for user in usersLogin:
            if(str(user["_id"]) == id):
                isID = True
                break
        if (isID == True):
            userLogin = {}
            userLogin["username"] = obj["username"]
            userLogin["password"] = obj["password"]
            return self.__usersLogin_dal.updateUserLogin(id, userLogin)
        else:
            return "There is no such ID in the system !"

    def deleteUserLogin(self, id):
        usersLogin = self.__usersLogin_dal.getUsersLogin()
        isID = False
        for user in usersLogin:
            if(str(user["_id"]) == id):
                isID = True
                break
        if (isID == True):
            return self.__usersLogin_dal.deleteUserLogin(id)
        else:
            return "There is no such ID in the system !"

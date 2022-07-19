from flask import make_response
from BL.usersLoginBL import UsersLoginBL
import jwt


class JwtBL:
    def __init__(self):
        self.__users_login_bl = UsersLoginBL()
        self.__key = "secret"
        self.__algo = "HS256"

    def getToken(self, username, password):
        userID = self.__check_user(username, password)
        if userID == -1:
            return make_response({"error": "wrong password"}, 401)
        if userID == -2:
            return make_response({"error": "wrong user name"}, 401)
        else:
            token = jwt.encode({"userid": userID}, self.__key, self.__algo)
            return make_response({"token": token, "id": userID}, 200)

    def verifyToken(self, token, header):
        if len(token) == 131 and header:
            data = jwt.decode(token, self.__key, self.__algo)
            userID = data["userid"]
            user = self.__users_login_bl.getUserLogin(userID)
            if user != False:
                return True
            else:
                return False
        return False

    def __check_user(self, username, pwd):
        users = self.__users_login_bl.getUsersLogin()
        for user in users:
            if user["username"] == username:
                if user["password"] == pwd:
                    id = str(user["_id"])
                    return id
                else:
                    return -1
        return -2

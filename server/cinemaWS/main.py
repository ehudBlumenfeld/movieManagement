from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from bson import ObjectId
import json
from BL.jwtBL import JwtBL
from BL.permissionsBL import PermissionsBL
from BL.subsctiptionWsBL import SubsctiptionWsBL
from BL.usersBL import UsersBL
from BL.usersLoginBL import UsersLoginBL

app = Flask(__name__)
CORS(app)


permissionsBL = PermissionsBL()
usersBL = UsersBL()
usersLoginBL = UsersLoginBL()
subsctiptionWsBL = SubsctiptionWsBL()
jwtBL = JwtBL()


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self,).default(obj)


app.json_encoder = MyEncoder

# routes for permissions:


@app.route('/permissions', methods=['GET'])
def getAllPermissions():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(permissionsBL.getAllPermissions())
    return make_response({"error": "Your not authorized"})


@app.route('/permissions/<string:id>', methods=['GET'])
def getPermission(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(permissionsBL.getPermission(id))
    return make_response({"error": "Your not authorized"})


@app.route('/permissions', methods=['POST'])
def addPermission():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        permission = request.json
        return jsonify(permissionsBL.addPermission(permission))
    return make_response({"error": "Your not authorized"})


@app.route('/permissions/<string:id>', methods=['PUT'])
def updatePermission(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        permission = request.json
        return jsonify(permissionsBL.updatePermission(permission, id))
    return make_response({"error": "Your not authorized"})


@app.route('/permissions/<string:id>', methods=['DELETE'])
def deletePermissions(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(permissionsBL.deletePermissions(id))
    return make_response({"error": "Your not authorized"})


# routes for users:

@app.route('/users', methods=['GET'])
def getAllUsers():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(usersBL.getAllUsers())
    return make_response({"error": "Your not authorized"})


@app.route('/users/<string:id>', methods=['GET'])
def getUser(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(usersBL.getUser(id))
    return make_response({"error": "Your not authorized"})


@app.route('/users', methods=['POST'])
def addUser():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        user = request.json
        return jsonify(usersBL.addUser(user))
    return make_response({"error": "Your not authorized"})


@app.route('/users/<string:id>', methods=['PUT'])
def updateUser(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        user = request.json
        return jsonify(usersBL.updateUser(user, id))
    return make_response({"error": "Your not authorized"})


@app.route('/users/<string:id>', methods=['DELETE'])
def deleteUser(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(usersBL.deleteUser(id))
    return make_response({"error": "Your not authorized"})

    # routes for users login:


@app.route('/userslogin', methods=['GET'])
def getUsersLogin():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(usersLoginBL.getUsersLogin())
    return make_response({"error": "Your not authorized"})


@app.route('/userslogin/<string:id>', methods=['GET'])
def getUserLogin(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(usersLoginBL.getUserLogin(id))
    return make_response({"error": "Your not authorized"})


@app.route('/userslogin', methods=['POST'])
def addUserLogin():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        user = request.json
        return jsonify(usersLoginBL.addUserLogin(user))
    return make_response({"error": "Your not authorized"})


@app.route('/userslogin/<string:id>', methods=['PUT'])
def updateUserLogin(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)

    if isToken == True:
        user = request.json
        return jsonify(usersLoginBL.updateUserLogin(id, user))
    return make_response({"error": "Your not authorized"})


@app.route('/userslogin/<string:id>', methods=['DELETE'])
def deleteUserLogin(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(usersLoginBL.deleteUserLogin(id))
    return make_response({"error": "Your not authorized"})


# routes for subscriptionsWS:

# get all from subscriptions(movies,members and subscriptions)


@app.route('/subscriptions/movies', methods=['GET'])
def getAllMoviesFromSubscriptionWS():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.getAllFromSubscriptionWS("movies"))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/members', methods=['GET'])
def getAllMembersFromSubscriptionWS():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.getAllFromSubscriptionWS("members"))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/subscriptions', methods=['GET'])
def getAllSubscriptionsFromSubscriptionWS():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.getAllFromSubscriptionWS("subscriptions"))
    return make_response({"error": "Your not authorized"})


# get only one by ID's from subscriptionsWS(movies,members and subscriptions)
@app.route('/subscriptions/movies/<string:id>', methods=['GET'])
def getMovieFromSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.getOneFromSubscriptionWS("movies", id))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/members/<string:id>', methods=['GET'])
def getMemberFromSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.getOneFromSubscriptionWS("members", id))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/subscriptions/<string:id>', methods=['GET'])
def getSubscriptionsFromSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.getOneFromSubscriptionWS("subscriptions", id))
    return make_response({"error": "Your not authorized"})


# add to subscriptionsWS(movie/members/subscriptions)


@app.route('/subscriptions/movies', methods=['POST'])
def addMovieToSubscriptionWS():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        obj = request.json
        return jsonify(subsctiptionWsBL.addOneToSubscriptionWS("movies", obj))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/members', methods=['POST'])
def addMemberToSubscriptionWS():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        obj = request.json
        return jsonify(subsctiptionWsBL.addOneToSubscriptionWS("members", obj))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/subscriptions', methods=['POST'])
def addSubscriptionToSubscriptionWS():
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        obj = request.json
        return jsonify(subsctiptionWsBL.addOneToSubscriptionWS("subscriptions", obj))
    return make_response({"error": "Your not authorized"})


# add to subscriptionsWS(movie/members/subscriptions)


@app.route('/subscriptions/movies/<string:id>', methods=['PUT'])
def updateMovieToSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        obj = request.json
        return jsonify(subsctiptionWsBL.updateOneOfSubscriptionWS("movies", obj, id))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/members/<string:id>', methods=['PUT'])
def updateMemberToSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        obj = request.json
        return jsonify(subsctiptionWsBL.updateOneOfSubscriptionWS("members", obj, id))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/subscriptions/<string:id>', methods=['PUT'])
def updateSubscriptionToSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        obj = request.json
        return jsonify(subsctiptionWsBL.updateOneOfSubscriptionWS("subscriptions", obj, id))
    return make_response({"error": "Your not authorized"})


# delete from subscriptionsWS(movie/members/subscriptions)


@app.route('/subscriptions/movies/<string:id>', methods=['DELETE'])
def deleteMovieFromSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.deleteOneOfSubscriptionWS("movies", id))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/members/<string:id>', methods=['DELETE'])
def deleteMemberFromSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.deleteOneOfSubscriptionWS("members", id))
    return make_response({"error": "Your not authorized"})


@app.route('/subscriptions/subscriptions/<string:id>', methods=['DELETE'])
def deleteSubscriptionsFromSubscriptionWS(id):
    headerss = request.headers
    token = request.headers.get("x-access-token")
    isToken = jwtBL.verifyToken(token, headerss)
    if isToken == True:
        return jsonify(subsctiptionWsBL.deleteOneOfSubscriptionWS("subscriptions", id))
    return make_response({"error": "Your not authorized"})


# route for jwt login


@app.route('/login', methods=["post"])
def login():
    userName = request.json["username"]
    pwd = request.json["password"]
    token = jwtBL.getToken(userName, pwd)
    return token


app.run()

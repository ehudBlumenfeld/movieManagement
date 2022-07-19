from flask import Flask, jsonify, request
from flask_cors import CORS
from BL.membersBL import MembersBL
import json
from bson import ObjectId
from BL.moviesBL import MoviesBL
from BL.subsctiptionBL import SubscriptionBL

app = Flask(__name__)
CORS(app)


moviesBL = MoviesBL()
membersBL = MembersBL()
subscriptionBL = SubscriptionBL()


# encoder for "objectID"


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)


app.json_encoder = MyEncoder
### routes for movies data sources:###


# route for loading movies to DB
@app.route('/movies', methods=['GET'])
def getAllMovies():
    return jsonify(moviesBL.getAllMovies())

# route for get movie


@app.route('/movies/<string:id>', methods=['GET'])
def getMovie(id):
    return jsonify(moviesBL.getMovie(id))


# route for create movie


@app.route('/movies', methods=['POST'])
def addMovie():
    newMovie = request.json
    return jsonify(moviesBL.addMovie(newMovie))


# route for delete movie


@app.route('/movies/<string:id>', methods=['DELETE'])
def deleteMovie(id):
    moviesBL.deleteMovie(id)
    return jsonify("DELETED !!!")


# route for update movie

@app.route('/movies/<string:id>', methods=['PUT'])
def updateMovie(id):
    movie = request.json
    moviesBL.updateMovie(id, movie)
    return jsonify("UPDATED !!!")


### routes for members data sources:###

# route for loading members


@app.route('/members', methods=['GET'])
def getAllMembers():
    return jsonify(membersBL.getAllMembers())


# route for get member


@app.route('/members/<string:id>', methods=['GET'])
def getMember(id):
    return jsonify(membersBL.getMember(id))

# route for create member


@app.route('/members', methods=['POST'])
def addMember():
    newMember = request.json
    return jsonify(membersBL.addMember(newMember))

# route for delete member


@app.route('/members/<string:id>', methods=['DELETE'])
def deleteMember(id):
    membersBL.deleteMember(id)
    return jsonify("DELETED !!!")


# route for update member

@app.route('/members/<string:id>', methods=['PUT'])
def updateMember(id):
    member = request.json
    membersBL.updateMember(id, member)
    return jsonify("UPDATED !!!")

### routes for subscription data sources:###


# route for loading subscription to DB
@app.route('/subscriptions', methods=['GET'])
def getAllSubscripton():
    return jsonify(subscriptionBL.getAllSubscriptions())


# route for get subscription


@app.route('/subscriptions/<string:id>', methods=['GET'])
def getSubscription(id):
    return jsonify(subscriptionBL.getSubscription(id))

# route for create subscription


@app.route('/subscriptions', methods=['POST'])
def addSubscription():
    newSubscriptons = request.json
    return jsonify(subscriptionBL.addSubscription(newSubscriptons))

# route for delete subscription


@app.route('/subscriptions/<string:id>', methods=['DELETE'])
def deleteSubscription(id):
    subscriptionBL.deleteSubscription(id)
    return jsonify("DELETED !!!")


# route for update subscription

@app.route('/subscriptions/<string:id>', methods=['PUT'])
def updateSubscription(id):
    subscription = request.json
    subscriptionBL.updateSubscription(id, subscription)
    return jsonify("UPDATED !!!")


app.run(host='0.0.0.0', port=5001)

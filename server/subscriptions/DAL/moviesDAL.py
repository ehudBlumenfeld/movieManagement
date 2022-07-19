import requests
from pymongo import MongoClient
from bson import ObjectId


class MoviesDAL:
    def __init__(self):
        self.__mongo_client = MongoClient(port=27017)
        self.__db = self.__mongo_client["moviesManagement"]

    def getMoviesFromWS(self):
        resp = requests.get("https://api.tvmaze.com/shows")
        return resp.json()

    def getMoviesFromDB(self):
        return self.__db["movies"].find({})

    def getMovie(self, id):
        movies = self.__db["movies"].find_one({"_id": ObjectId(id)})
        return movies

    def addMovie(self, movie):
        self.__db["movies"].insert_one(movie)
        return str(movie["_id"])

    def deleteMovie(self, id):
        self.__db["movies"].delete_one({'_id': ObjectId(id)})

    def updateMovie(self, id, movie):
        self.__db["movies"].update_one(
            {'_id': ObjectId(id)}, {"$set": movie})

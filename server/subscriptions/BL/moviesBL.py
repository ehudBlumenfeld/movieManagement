from DAL.moviesDAL import MoviesDAL


class MoviesBL:
    def __init__(self):
        self.__movies_dal = MoviesDAL()

    def getAllMovies(self):
        moviesDB = list(self.__movies_dal.getMoviesFromDB())
        if len(moviesDB) == 0:
            data = self.__movies_dal.getMoviesFromWS()
            movies = []
            for movie in data:
                mov = {}
                mov["name"] = movie["name"]
                mov["genres"] = movie["genres"]
                mov["premiered"] = movie["premiered"]
                mov["image"] = movie["image"]["original"]
                movies.append(mov)
                self.__movies_dal.addMovie(mov)
            return movies

        else:
            return moviesDB

    def getMovie(self, id):
        movie = self.__movies_dal.getMovie(id)
        return movie

    def addMovie(self, movieObj):
        movie = {}
        movie["name"] = movieObj["name"]
        movie["genres"] = movieObj["genres"]
        movie["premiered"] = movieObj["premiered"]
        movie["image"] = movieObj["image"]
        id = self.__movies_dal.addMovie(movie)
        return id

    def updateMovie(self, id, movieObj):
        movie = {}
        movie["name"] = movieObj["name"]
        movie["genres"] = movieObj["genres"]
        movie["premiered"] = movieObj["premiered"]
        movie["image"] = movieObj["image"]
        self.__movies_dal.updateMovie(id, movie)
        return "UPDATED !!!"

    def deleteMovie(self, id):
        self.__movies_dal.deleteMovie(id)
        return "DELETED !!!"

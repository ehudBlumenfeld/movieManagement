from flask import request
import requests


class SubsctiptionWsDAL:
    def __init__(self):
        self.__url = "http://192.168.68.104:5001/"
        #self.__url = "http://192.168.1.103:5001/"

    def getAllFromSubscriptionWS(self, link):
        resp = requests.get(self.__url+link)
        return resp.json()

    def getOneFromSubscriptionWS(self, link, Id):
        resp = requests.get(self.__url+link+"/"+Id)
        return resp.json()

    def addOneToSubscriptionWS(self, link, obj):
        resp = requests.post(self.__url+link, json=obj)
        return resp.json()

    def updateOneOfSubscriptionWS(self, link, obj, Id):
        resp = requests.put(self.__url+link+"/"+Id, json=obj)
        return resp.json()

    def deleteOneOfSubscriptionWS(self, link, id):
        resp = requests.delete(self.__url+link+"/"+id)
        return resp.json()

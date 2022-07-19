from DAL.subsctiptionWsDAL import SubsctiptionWsDAL

# all CRUD logic was done in 'subscription'


class SubsctiptionWsBL:
    def __init__(self):
        self.__subsctiptionWs_dal = SubsctiptionWsDAL()

    def getAllFromSubscriptionWS(self, link):
        return (self.__subsctiptionWs_dal.getAllFromSubscriptionWS(link))

    def getOneFromSubscriptionWS(self, link, id):
        return (self.__subsctiptionWs_dal.getOneFromSubscriptionWS(link, id))

    def addOneToSubscriptionWS(self, link, obj):
        return (self.__subsctiptionWs_dal.addOneToSubscriptionWS(link, obj))

    def updateOneOfSubscriptionWS(self, link, obj, id):
        return (self.__subsctiptionWs_dal.updateOneOfSubscriptionWS(link, obj, id))

    def deleteOneOfSubscriptionWS(self, link, id):
        return (self.__subsctiptionWs_dal.deleteOneOfSubscriptionWS(link, id))

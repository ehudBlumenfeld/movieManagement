from DAL.subscriptionDAL import subscriptionDAL


class SubscriptionBL:
    def __init__(self):
        self.__subscription_dal = subscriptionDAL()

    def getAllSubscriptions(self):
        subscriptionDB = list(self.__subscription_dal.getSubscriptions())
        return subscriptionDB

    def getSubscription(self, id):
        subscription = self.__subscription_dal.getSubscription(id)
        return subscription

    def addSubscription(self, subscriptionObj):
        subscription = {}
        subscription["memberID"] = subscriptionObj["memberID"]
        subscription["movies"] = subscriptionObj["movies"]
        id = self.__subscription_dal.addSubscription(subscription)
        return id

    def updateSubscription(self, id, subscriptionObj):
        subscription = {}
        subscription["memberID"] = subscriptionObj["memberID"]
        subscription["movies"] = subscriptionObj["movies"]
        self.__subscription_dal.updateSubscription(id, subscription)
        return "UPDATED !!!"

    def deleteSubscription(self, id):
        self.__subscription_dal.deleteSubscription(id)
        return "DELETED !!!"

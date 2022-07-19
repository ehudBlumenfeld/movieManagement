from DAL.membersDAL import MembersDAL


class MembersBL:
    def __init__(self):
        self.__members_dal = MembersDAL()

    def getAllMembers(self):
        membersDB = list(self.__members_dal.getMembersFromDB())
        if len(membersDB) == 0:
            data = self.__members_dal.getMembersFromWS()
            members = []
            for member in data:
                membr = {}
                membr["name"] = member["name"]
                membr["email"] = member["email"]
                membr["city"] = member["address"]["city"]
                members.append(membr)
                self.__members_dal.addMember(membr)
            return members

        else:
            return membersDB

    def getMember(self, id):
        member = self.__members_dal.getMember(id)
        return member

    def addMember(self, memberObj):
        member = {}
        member["name"] = memberObj["name"]
        member["email"] = memberObj["email"]
        member["city"] = memberObj["city"]
        id = self.__members_dal.addMember(member)
        return id

    def updateMember(self, id, memberObj):
        member = {}
        member["name"] = memberObj["name"]
        member["email"] = memberObj["email"]
        member["city"] = memberObj["city"]
        self.__members_dal.updateMember(id, member)
        return "UPDATED !!!"

    def deleteMember(self, id):
        self.__members_dal.deleteMember(id)
        return "DELETED !!!"

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import checkPermission from "../checkPermission";
import AddMemberComp from "./addMember";
import AllMembersComp from "./allMembers";


function SubscriptionsComp() {

const [isAllMembers,setIsAllMembers]=useState(true)
const [isAddMember,setIsAddMember]=useState(false)
const [isCreateMember,setIsCreateMember]=useState(false)
const [isDelMember,setIsDelMember]=useState(false)
const [isUpdMember,setIsUpdMember]=useState(false)
const storeData=useSelector(state=>state)


useEffect(()=>{
 if(storeData.userDetails.permissions){
    let per=storeData.userDetails.permissions[0]
    let check=checkPermission(per,"CREATE MEMBER")
    setIsCreateMember(check)
    
    check=checkPermission(per,"UPDATE MEMBER")
    setIsUpdMember(check)

    check=checkPermission(per,"DELETE MEMBER")
    setIsDelMember(check)
 }
},[])
const getMembers=()=>{
setIsAllMembers(true)
setIsAddMember(false)
}
const addMeber=()=>{
setIsAllMembers(false)
setIsAddMember(true)
}

  return (
    <div>
      <h1>Subscriptions :</h1>
      <Button variant="contained" color="success" onClick={getMembers}>
        All Members 
         </Button>
         {
        isCreateMember&& <Button variant="contained" color="success" onClick={addMeber}>
        Add Member 
         </Button>
        }
         <hr/>
    {
      isAllMembers?
      <>
      
      <AllMembersComp isCreate={isCreateMember} isUpdate={isUpdMember} isDelete={isDelMember}/>
      </>
      :
      <>
      {
        null
      }
      </>
    }
      {
      isAddMember?
      isCreateMember&&<AddMemberComp callback={data=>setIsAddMember(getMembers)}/>
      :
      <>
      {
        null
      }
      </>
    }          
    </div>
  );
}

export default SubscriptionsComp;

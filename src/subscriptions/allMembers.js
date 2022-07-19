import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemberComp from "./member";



function AllMembersComp(props) {
const storeData=useSelector(state=>state)
const[members,setMembers]=useState(null)

useEffect(()=>{
  setMembers(storeData.members)
},[storeData.members])
  return (
    <div>
      {
        members?
        members.map(item=>{
          return <MemberComp key={item._id} member={item} isCreate={props.isCreate} isUpdate={props.isUpdate} isDelete={props.isDelete} />
        })

        :
        <>
        Loading...
        </>
      }
    </div>
  );
}

export default AllMembersComp;

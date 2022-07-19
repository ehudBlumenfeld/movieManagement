import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserData from "./usersDataUtils";



function AllUsersComp() {
const storeData=useSelector(state=>state)
const dispatch=useDispatch()
const[users,setUsers]=useState([])
const navigate=useNavigate()


useEffect(()=>{
let data=UserData(storeData)
setUsers(data)
},[storeData.permissions.length,storeData.users.length,storeData.usersLogin.length])


const del=(id)=>{
  dispatch({type:"DELETE USER",payload:id})
}

  return (
    <div>
      <h2>ALL USERS</h2>
     
                     
      
    {
      users.length?
      
    users.map((item,index)=>
    {
      return <div key={index} style={{border:"2px",borderStyle:'solid',borderColor:'green' ,width:"250px"}}>
                         
            <span style={{color:"green"}}>NAME :</span>{item.fname} {item.lname}<br/>
            <span style={{color:"green"}}>USER NAME :</span>{item.username}<br/>
            <span style={{color:"green"}}>SESSION TIME OUT :</span>{item.sessionTimeOut}<br/>
            <span style={{color:"green"}}>CREATE DATE :</span>{item.createDate}<br/>
            <span style={{color:"green"}}>PERMISSIONS :</span>{item.permissions.map((item1,index1)=>{
              return<div key={index1}>{item1}</div>
            })           
            }
            <br/>
             <Button variant="contained" color="success" size="small" onClick={()=>navigate("/editUser/"+item.id)}>
            EDIT
            </Button>
            <Button variant="contained" color="success" size="small" onClick={()=>del(item.id)}>
            DELETE
            </Button>
            <br/><br/>
            </div>
            
    })
    :
    <>LOADING...</>
    }

       
    </div>
    
  );
}

export default AllUsersComp;

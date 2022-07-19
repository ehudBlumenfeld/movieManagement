import { Box, Button, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserData from "./usersDataUtils";



function EditUserComp() {
const params=useParams()
const navigate=useNavigate()
const dispatch=useDispatch()
const storeData=useSelector(state=>state)
const [user,setUser]=useState(false)
const [permission,setPermission]=useState()
useEffect(()=>{
  let id=params.id
  let users=UserData(storeData)
  let userr=users.find(x=>x.id==id)
  if (userr)
  {
    let per=userr.permissions
    let p={CreateMovies: false, CreateSubscriptions: false, DeleteMovies: false, DeleteSubscriptions: false, UpdateMovies: false,UpdateSubscriptions: false, ViewMovies: false, ViewSubscriptions: false}
    per.forEach(perr => {
          if (perr==="Create Movies"){           
            p={...p,CreateMovies:true}          
          }
          if (perr==="Create Subscriptions"){
            p={...p,CreateSubscriptions:true}
          }
          if (perr==="Delete Movies"){
            p={...p,DeleteMovies:true}
          }
          if (perr==="Delete Subscriptions"){
            p={...p,DeleteSubscriptions:true}
          }
          if (perr==="View Movies"){
            p={...p,ViewMovies:true}
          }
          if (perr==="View Subscriptions"){
            p={...p,ViewSubscriptions:true}
          }
          if (perr==="Update Subscriptions"){
            p={...p,UpdateSubscriptions:true}
          }
          if (perr==="Update Movie"){
            p={...p,UpdateMovies:true}
          }   
    });
    setPermission(p) 
  }
  setUser(userr)
},[])

const save=()=>{
  let updateUser={
    id:user.id ,
    fname:user.fname,
    lname: user.lname,
    createdDate:user.createDate ,
    sessionTimeOut:user.sessionTimeOut,
  }
  let updateUserLogin={username:user.username,password:user.password,_id:user.id}
  let updatePermission={id:user.id,permissions:[permission]}
  let updateData={permissions:updatePermission,user:updateUser,userLogin:updateUserLogin}
  dispatch({type:"EDIT USER",payload:updateData})
  navigate('/user_management')

}
const cancel=()=>{
navigate('/user_management')
}

  return (
    <div>
      {
      user?
      <Box textAlign={'center'}>
        <h2 style={{color:"green"}}>Edit User : {user.fname} {user.lname}</h2>
        <br/>
           <TextField value={user.fname} label="First Name :" variant="filled" color="success" onChange={e=>setUser({...user,fname:e.target.value})} /><br/> <br/>
           <TextField  value={user.lname} label="Last Name :" variant="filled" color="success" onChange={e=>setUser({...user,lname:e.target.value})} /><br/><br/>
            <TextField  value={user.username} label="User Name :" variant="filled" color="success" onChange={e=>setUser({...user,username:e.target.value})} /><br/><br/>
            <TextField  value={user.sessionTimeOut} label="Session Time Out :" variant="filled" color="success" type="number" onChange={e=>setUser({...user,sessionTimeOut:e.target.value})} /><br/><br/>
            <TextField  value={user.createDate} label="Created Date :" variant="filled" color="success"  onChange={e=>setUser({...user,createDate:e.target.value})} /><br/> <br/> 
            <span style={{fontSize:"30px", color:'green'}}>Permission :</span><br/>

           <label> <Checkbox color="success" onChange={e=>setPermission({...permission,CreateMovies:e.target.checked})} checked={permission.CreateMovies} />Create Movies</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,DeleteMovies:e.target.checked})} checked={permission.DeleteMovies}/>Delete Movies</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,UpdateMovies:e.target.checked})} checked={permission.UpdateMovies}/>Update Movies</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,ViewMovies:e.target.checked})} checked={permission.ViewMovies}/>View Movies</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,CreateSubscriptions:e.target.checked})} checked={permission.CreateSubscriptions}/>Create Subscriptions</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,DeleteSubscriptions:e.target.checked})} checked={permission.DeleteSubscriptions}/>Delete Subscriptions</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,UpdateSubscriptions:e.target.checked})} checked={permission.UpdateSubscriptions}/>Update Subscriptions</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,ViewSubscriptions:e.target.checked})} checked={permission.ViewSubscriptions}/>View Subscriptions</label><br/>

           <Button variant="contained" color="success" size="small" onClick={save}>
            SAVE
            </Button>
            <Button variant="contained" color="success" size="small" onClick={cancel}>
            CANCEL
            </Button>

                    
      </Box>
            
      :
      <>
      LOADIG...
      </>
    }
      
        
    </div>
  );
}

export default EditUserComp;

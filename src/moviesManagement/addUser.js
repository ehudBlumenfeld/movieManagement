import { Box, Button, Checkbox, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function AddUsersComp(props) {
const storeData=useSelector(state=>state)
const dispatch=useDispatch()
const [user,setUser]=useState(false)
const [permission,setPermission]=useState({CreateMovies: false, CreateSubscriptions: false, DeleteMovies: false, DeleteSubscriptions: false, UpdateMovies: false,UpdateSubscriptions: false, ViewMovies: false, ViewSubscriptions: false})


 const save=async()=>{
  let isUsersname=true
  storeData.usersLogin.forEach(element => {
    if (element.username===user.username)
    {
      isUsersname=false
    }
  });
  if(isUsersname===true)
  {
    let newUserLogin={username:user.username,password:user.password}
    let header={headers:{"x-access-token":storeData.userDetails.token}}
  await axios.post("http://127.0.0.1:5000/userslogin",newUserLogin,header).then(data =>
     {
       let id=(data.data)
       newUserLogin={...newUserLogin,_id:id}
       let newPermission={permissions:[permission],id:id}
       let newUser={
              fname:user.fname,
              lname: user.lname,
              createdDate:user.createDate ,
              sessionTimeOut:user.sessionTimeOut,
              id:id
            }
       let newData={permissions:newPermission,user:newUser,userLogin:newUserLogin}  
       dispatch({type:"ADD USER",payload:newData})
       props.callback(false)
     })
 
  }
 else{
   alert("wrong in user name")
 }

}
const cancel=()=>{
props.callback(false)
}

  return (
    <div>
      {
      
      <Box textAlign={'center'}>
        <h2 style={{color:"green"}}>Add New User :</h2>
        <br/>
           <TextField  label="First Name :" variant="filled" color="success" onChange={e=>setUser({...user,fname:e.target.value})} /><br/> <br/>
           <TextField   label="Last Name :" variant="filled" color="success" onChange={e=>setUser({...user,lname:e.target.value})} /><br/><br/>
            <TextField   label="User Name :" variant="filled" color="success" onChange={e=>setUser({...user,username:e.target.value})} /><br/><br/>
            <TextField   label="Password :" variant="filled" color="success" onChange={e=>setUser({...user,password:e.target.value})} /><br/><br/>
            <TextField   label="Session Time Out :" variant="filled" color="success" type="number" onChange={e=>setUser({...user,sessionTimeOut:e.target.value})} /><br/><br/>
            <TextField   label="Created Date :" variant="filled" color="success"  onChange={e=>setUser({...user,createDate:e.target.value})} /><br/> <br/> 
            <span style={{fontSize:"30px", color:'green'}}>Permission :</span><br/>

           <label> <Checkbox color="success" onChange={e=>setPermission({...permission,CreateMovies:e.target.checked})}  />Create Movies</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,DeleteMovies:e.target.checked})} />Delete Movies</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,UpdateMovies:e.target.checked})} />Update Movies</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,ViewMovies:e.target.checked})}/>View Movies</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,CreateSubscriptions:e.target.checked})} />Create Subscriptions</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,DeleteSubscriptions:e.target.checked})} />Delete Subscriptions</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,UpdateSubscriptions:e.target.checked})} />Update Subscriptions</label><br/>

            <label> <Checkbox color="success" onChange={e=>setPermission({...permission,ViewSubscriptions:e.target.checked})} />View Subscriptions</label><br/>

           <Button variant="contained" color="success" size="small" onClick={save}>
            SAVE
            </Button>
            <Button variant="contained" color="success" size="small" onClick={cancel}>
            CANCEL
            </Button>

                    
      </Box>
            

    }
      
        
    </div>
  );
}

export default AddUsersComp;

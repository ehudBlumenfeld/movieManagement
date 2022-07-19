import { Button } from "@mui/material";
import { useState } from "react";
import AddUsersComp from "./addUser";
import AllUsersComp from "./allUsers";


function MoviesManagementComp() {
const [isAllUsers,setIsAllUsers]=useState(true)
const [isAddUsers,setIsAddUsers]=useState(false)

const getUsers=()=>{
setIsAllUsers(true)
setIsAddUsers(false)
}
const addUser=()=>{
setIsAllUsers(false)
setIsAddUsers(true)
}

  return (
    <div>
      <h1>USERS:</h1>
      <Button variant="contained" color="success" onClick={getUsers}>
        All Users 
         </Button>
         <Button variant="contained" color="success" onClick={addUser}>
        Add User 
         </Button>
         <hr/>
    {
      isAllUsers?
      <>
      
      <AllUsersComp/>
      </>
      :
      <>
      {
        null
      }
      </>
    }
      {
      isAddUsers?
      <>
      <AddUsersComp callback={data=>setIsAddUsers(getUsers)}/>
      </>
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

export default MoviesManagementComp;

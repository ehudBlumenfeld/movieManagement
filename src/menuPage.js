import { useNavigate,Route,Routes } from 'react-router';
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateAccountComp from './login/createAccount';
import LoginComp from './login/login';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MoviesComp from './movies/movies';
import SubscriptionsComp from './subscriptions/subscriptions';
import MoviesManagementComp from './moviesManagement/moviesManagement';
import { Button } from '@mui/material';
import EditUserComp from './moviesManagement/editUser';
import EditMovieComp from './movies/editMovie';
import EditMemberComp from './subscriptions/editMember';
import checkPermission from './checkPermission';

function MenuPageComp() {
const navigate=useNavigate()
const storeData=useSelector(state=>state)
const [isLogin,setIsLogin]=useState(false)
const dispatch=useDispatch()
const [isUserManagment,setIsUserManagment]=useState(false)
const [isMovies,setIsMovies]=useState(false)
const [isSubscription,setIsSubscription]=useState(false)

const url="http://127.0.0.1:5000/"

useEffect(()=>
    {
    if (storeData.userDetails.length!==0){
    setIsLogin(true)
    }
    else{
    setIsLogin(false)
    navigate("/login")
    }     
},[storeData.userDetails.length])

useMemo(()=>{
  if(storeData.userDetails.permissions){
    let per=storeData.userDetails.permissions[0]
    let check=checkPermission(per,"USER MANAGMENT")
    setIsUserManagment(check)
    if (check){
      setIsMovies(check)
      setIsSubscription(check)
    }
    else{
    check=checkPermission(per,"MOVIES")
    setIsMovies(check)

    check=checkPermission(per,"SUBSCRIPTION")
    setIsSubscription(check)
    }
  } 
},[isLogin])

useMemo(()=>{
  async function getData(){
    let token=storeData.userDetails.token
    let headers={headers:{"x-access-token":token}}

  let movies=await axios.get(url+"subscriptions/movies",headers)
    dispatch({type:"LOAD MOVIES",payload:movies.data})        
  let members=await axios.get(url+"subscriptions/members",headers)
    dispatch({type:"LOAD MEMBERS",payload:members.data})
  let subscriptions=await axios.get(url+"subscriptions/subscriptions",headers)
      dispatch({type:"LOAD SUBSCRIPTIONS",payload:subscriptions.data})
  let users_login=await axios.get(url+"userslogin",headers)
    dispatch({type:"LOAD USERS LOGIN",payload:users_login.data})
  let permissions=await axios.get(url+"permissions",headers)
    dispatch({type:"LOAD PERMISSIONS",payload:permissions.data})
  let users=await axios.get(url+"users",headers)
    dispatch({type:"LOAD USERS",payload:users.data})
      
  }getData()
},[storeData.permissions.length,storeData.users.length,storeData.usersLogin.length])

const logout=()=>
{
  setIsLogin(false)
  dispatch({type:"LOGOUT"}) 
  navigate("/login") 
}
  return (
       <div>
      {
       !isLogin?
       <>   
       {
          null 
       }                  
      </>
        :
        
        <div style={{border:"4px" ,backgroundColor:'green'  }}>
          <Button variant="contained" color="success" onClick={logout}>
        Logout 
         </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {
        isMovies?<Link style={{color:"white",fontSize:"20px"}} to="/">movies</Link>
        :<></>
        }
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        { 
        isSubscription? <Link style={{color:"white",fontSize:"20px"}} to="/subscriptions">subscriptions</Link>
        :<></>
        }
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {
        isUserManagment?  <Link style={{color:"white",fontSize:"20px"}} to="/user_management">user management</Link>
        :<></>
        }
       </div>}
            

          <Routes>
    <Route path="/create_account" element={<CreateAccountComp/>}></Route>
    <Route path="/menu/*" element={<MenuPageComp/>}></Route>
    <Route path="/login" element={<LoginComp/>}></Route>
    {
    isMovies && <Route path="/" element={<MoviesComp/>}></Route>
    }
    {
    isSubscription && <Route path="/subscriptions" element={<SubscriptionsComp/>}></Route>
    }
    {
    isUserManagment && <Route path="/user_management" element={<MoviesManagementComp/>}></Route>
    }
    <Route path="/editUser/:id" element={<EditUserComp />}></Route>
    <Route path="/editMovie/:id" element={<EditMovieComp />}></Route>
   <Route path="/editMember/:id" element={<EditMemberComp />}></Route>
        </Routes>
   
    </div>
  );
}

export default MenuPageComp;


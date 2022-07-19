import {TextField,Box,Button} from '@mui/material';
import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';


function CreateAccountComp() {
const dispatch=useDispatch()
const navigate=useNavigate()
const [newLogin,setNewLogin]=useState({username:"",password:"",newPassword:null})




const create=async()=>
  {
     try 
        {
          await axios.post("http://127.0.0.1:5000/login",newLogin).then(token=>{
          let obj={"token":token.data.token,"newIdentify":newLogin,"id":token.data.id}        
          dispatch({type:"CREATE ACCOUNT",payload:obj})
          navigate("/login")    
          })
        }
     catch (error)
        {
          alert("wrong user,plaese try again");
        }      
       }

  return (
    <div>

      
    <Box textAlign={'center'}>
      <br/><br/><br/>
      <h3>plese enter your details</h3><br/><br/>
      <TextField  label="Name" variant="filled" color="success" onChange={e=>setNewLogin({...newLogin,username:e.target.value})} /><br/>
      <TextField type="password" label="Password" variant="filled" color="success" onChange={e=>setNewLogin({...newLogin,password:e.target.value})} /><br/>

      <TextField type="password" label="New Password" variant="filled" color="success" onChange={e=>setNewLogin({...newLogin,newPassword:e.target.value})} /><br/><br/>

      <Button variant="contained" color="success" onClick={create}>
        Create 
      </Button>

     

    </Box>

    <footer></footer>

    </div>
  );
}

export default CreateAccountComp;

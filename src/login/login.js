import {TextField,Box,Button} from '@mui/material';
import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';


function LoginComp() {
const dispatch=useDispatch()
const navigate=useNavigate()
const [login,setLogin]=useState({username:"",password:""})




const Login=async()=>
  {
     try 
        {
          const token = await axios.post("http://127.0.0.1:5000/login",login);
          let id=token.data.id
          let tkn=token.data.token
          let obj={headers:{"x-access-token":tkn}}
          const permission=await axios.get("http://127.0.0.1:5000/permissions/"+id,obj)
          const user=await axios.get("http://127.0.0.1:5000/users/"+id,obj)
          obj={"token":tkn,"user":user,"permissions":permission,username:login.username}
          dispatch({type:"LOGIN",payload:obj})
          navigate("/menu/*")
        }
     catch (error)
        {
          alert("wrong user,plaese try again");
        }      
       }
        
          
          
  
const create_account=()=>
{
  navigate("/create_account")
}
  return (
    <div>

      
    <Box textAlign={'center'}>
      <br/><br/><br/>
      <h3>plese enter your details</h3><br/><br/>
      <TextField  label="Name" variant="filled" color="success" onChange={e=>setLogin({...login,username:e.target.value})} /><br/>
      <TextField  label="Password" variant="filled" color="success" onChange={e=>setLogin({...login,password:e.target.value})} /><br/>
      <Button variant="contained" color="success" onClick={Login}>
        Login 
      </Button>

      <h3>are you new ?</h3> 
      <Button variant="contained" color="success" onClick={create_account}>
        Create account 
      </Button>

    </Box>

    <footer></footer>

    </div>
  );
}

export default LoginComp;
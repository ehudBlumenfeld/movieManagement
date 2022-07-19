import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box, grid } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function AddMemberComp(props) {
const storeData=useSelector(state=>state)
const [member,setMember]=useState({name:null,email:null,city:null})
const dispatch=useDispatch()

const save=()=>{
  if(member.name &&member.email&&member.city){
    let header={headers:{"x-access-token":storeData.userDetails.token}}
    axios.post("http://127.0.0.1:5000//subscriptions/members",member,header).then(data =>{
    let id=data.data
    let newMember={...member,_id:id}
    dispatch({type:"ADD MEMBER",payload:newMember})
    })   
    props.callback(false) 
      }
  else{
      alert("please try again")
      }
 } 

const cancel=()=>{
   props.callback(false)
}

  return (
    <div>
      <h2 style={{color:"grey"}}>
      Add Member :
      </h2>
      <Box textAlign={'center'}>
           <TextField  label="Name :" variant="filled" color="success" onChange={e=>setMember({...member,name:e.target.value})} /><br/> <br/>
           <TextField   label="Email :" variant="filled" color="success" onChange={e=>setMember({...member,email:e.target.value})} /><br/><br/>
          <TextField  label="City :" variant="filled" color="success" onChange={e=>setMember({...member,city:e.target.value})} /><br/> <br/>

    <Button variant="contained" color="success" size="small" onClick={save}>
        SAVE
    </Button>
    <Button variant="contained" color="success" size="small" onClick={cancel}>
        CANCEL
    </Button>
    </Box>
    </div>
  );
}

export default AddMemberComp;




  
   //   axios.post("http://127.0.0.1:5000//subscriptions/members",member,header).then(data =>{
     // 
    
  //
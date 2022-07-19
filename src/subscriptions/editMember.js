import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";




function EditMemberComp() {
const params=useParams()
const navigate=useNavigate()
const dispatch=useDispatch()
const storeData=useSelector(state=>state)
const [member,setMember]=useState(false)
useEffect(()=>{
  let id=params.id
  let membr=storeData.members.find(x=>x._id==id)
  if (membr)
  {
     setMember(membr) 
  }
  else{
    alert("ERROR !!!")
  }
},[])

const save=()=>{
  dispatch({type:"EDIT MEMBER",payload:member})
  navigate('/subscriptions')
}
const cancel=()=>{
navigate('/subscriptions')
}

  return (
    <div>
      {
      member?
      <Box textAlign={'center'}>
        <h2 style={{color:"green"}}>Edit Member : {member.name} </h2>
        <br/>
           <TextField value={member.name} label="Name :"  variant="filled" color="success" onChange={e=>setMember({...member,name:e.target.value})} /><br/> <br/>
           <TextField  value={member.email} label="Email :"  variant="filled" color="success" onChange={e=>setMember({...member,email:e.target.value})} /><br/><br/>
            <TextField  value={member.city} label="City :"  variant="filled" color="success" onChange={e=>setMember({...member,city:e.target.value})} /><br/><br/>
        
      

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

export default EditMemberComp;

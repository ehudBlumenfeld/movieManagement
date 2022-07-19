import { Button, TextField } from "@mui/material";

import { Box } from "@mui/system";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddSubComp from "./addSubscription";
import memberWithSub from "./memberWithSubUtils";



function MemberComp(props) {
const [member,setMember]=useState({})
const [isNewSub,setIsNewSub]=useState(false)
const storeData=useSelector(state=>state)
const [subscriptions,setSubscriptions]=useState([])
const [isCreateMember,setIsCreateMember]=useState(false)
const [isDelMember,setIsDelMember]=useState(false)
const [isUpdMember,setIsUpdMember]=useState(false)

const navigate=useNavigate()
const dispatch=useDispatch()


useEffect(()=>{
setIsCreateMember(props.isCreate)
setIsDelMember(props.isUpdate)
setIsUpdMember(props.isDelete)
setMember(props.member)
if (storeData.subscriptions.length>0){
 let newSub= memberWithSub(storeData,props.member)
 if(newSub){
    setSubscriptions([newSub])
    }
 }
},[isNewSub,storeData.subscriptions])

const del=(id)=>{
  dispatch({type:"DELETE MEMBER",payload:id})
}

  return (
    <div>
      <br/>
      <Box style={{border:"2px",borderStyle:'solid',borderColor:'green' }}>
         <Box textAlign={'left'}>         
            <div style={{width: "100%", float:'left' ,color:'green'}}>
              <h2 style={{color:'gray'}}>{member.name}</h2>
              <span style={{color:'gray'}}>Email :</span>
              {member.email}<br/>
              <span style={{color:'gray'}}>City :</span>
              {member.city}<br/><br/>

           </div>
           {
            isUpdMember&&<Button variant="contained" color="success" size="small" onClick={()=>navigate("/editMember/"+member._id)}>
            EDIT
            </Button>
          }
            {
            isDelMember && <Button variant="contained" color="success" size="small" onClick={()=>del(member._id)}>
            DELETE
            </Button>
            }
            <br/><br/>
            </Box> 
       <Box textAlign={'right'} >
         <h3 style={{color:'grey'}}>Movies Watched</h3>
          {
            isCreateMember && <Button variant="contained" color="success" size="small" onClick={()=>setIsNewSub(true)}>
                Subscription to new movie
            </Button>
          }
           <br/><br/>
            {
              isNewSub && <AddSubComp member={member} callback={data=>setIsNewSub(false)}/>           
            }
        {
        subscriptions.length?
        
        <ul style={{border:"2px",borderStyle:'solid',borderColor:'green' ,width: "20%",textAlign:"center" }}>   
          {
        subscriptions[0].movies.map((item,index)=>{
          return<li key={index}>
            <Link to={"/editMovie/"+item.movieID}>{item.name}, </Link>
         {item.createDate}
          </li>})
          }
        </ul>
        
          :
          <span  style={{color:'goldenrod',width: "100%", float:'center'}}>           
              he have not watched yet
          </span>
        }      
      </Box>
          </Box>
        
    </div>
  );
}

export default MemberComp;

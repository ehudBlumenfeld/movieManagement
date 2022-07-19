import { useListbox } from "@mui/base";
import { Button, LinearProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import moviesWithSub from "./moviesWithSubscriptionUtils";



function MovieComp(props) {
const [movie,setMovie]=useState({})
const storeData=useSelector(state=>state)
const [subscriptions,setSubscriptions]=useState([])
const [isDelMovie,setIsDelMovies]=useState(false)
const [isUpdMovie,setIsUpdMovies]=useState(false)
const navigate=useNavigate()
const dispatch=useDispatch()


useEffect(()=>{
setMovie(props.movie)
setIsDelMovies(props.isDelMember)
setIsUpdMovies(props.isUpdMovie)


if (storeData.subscriptions.length>0){
  let subscription=moviesWithSub(storeData,props.movie)
  setSubscriptions(subscription)
}
},[props])

const del=(id)=>{
  dispatch({type:"DELETE MOVIE",payload:id})
}

  return (
    <div>
      <br/>
      <Box style={{border:"2px",borderStyle:'solid',borderColor:'green' }}>
       <Box textAlign={'right'} >
        {
        subscriptions.length?
        <ul>{
        subscriptions.map((item,index)=>{
          return<li key={index}>
               <Link to={"/editMember/"+item.memberID}>{item.name}, </Link> {item.createDate}
          </li>})
          }   
        </ul>
          :
          <span  style={{color:'goldenrod',width: "100%", float:'center'}}>
            <h3>subscription</h3>
              there isn't any subscription
          </span>
        }      
      </Box>
         <Box textAlign={'left'}>
           <div style={{width: "40%", float:'left'}}>
          <img src={movie.image} style={{width:"100px",}}/>
           </div>
            <div style={{width: "60%", float:'left'}}>
              {movie.name}<br/>
              {movie.premiered}<br/><br/>
              <span style={{color:'gray'}}>GENERS :</span>
              <ul>
              {
              movie.genres?
              movie.genres.map((itm,indx)=>{
                  return<li key={indx} style={{color:'green'}}>{itm}</li>
              })
              :
              <>null</>
            }
              </ul>
           </div>
           {
            isUpdMovie&&<Button variant="contained" color="success" size="small" onClick={()=>navigate("/editMovie/"+movie._id)}>
            EDIT
            </Button>
            }
            {           
           isDelMovie&&<Button variant="contained" color="success" size="small" onClick={()=>del(movie._id)}>
            DELETE
            </Button>
            } 
            <br/><br/>
            </Box>
          </Box>
        
    </div>
  );
}

export default MovieComp;

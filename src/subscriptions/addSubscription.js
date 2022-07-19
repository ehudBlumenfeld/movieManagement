import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function AddSubComp(props) {
const storeData=useSelector(state=>state)
const [movie,setMovie]=useState({movieID:""})
const dispatch=useDispatch()



const save=()=>{
  let member=props.member
  let subscriptions=storeData.subscriptions
  let newSub=subscriptions.find(x=>x.memberID===member._id)
  if(newSub){
        newSub.movies.push(movie)
        dispatch({type:"ADD SUBSCRIBE",payload:newSub})
}
    else{
      newSub={memberID:member._id,
              movies:[movie]
      }
      let header={headers:{"x-access-token":storeData.userDetails.token}}
       axios.post("http://127.0.0.1:5000//subscriptions/subscriptions",newSub,header).then(data =>{
        let id=data.data
        newSub={...newSub,_id:id}
        dispatch({type:"ADD NEW SUBSCRIBE",payload:newSub})        
    })
    }
    props.callback(false)
}

  return (
    <div>
      <h4>Add a new movie</h4>
      <Box>
     
        <FormControl sx={{m:1,minWidth:80}}>
          <InputLabel id="movies">movies</InputLabel>
      <Select labelId="movies" value={movie.movieID} color="success" label="movies" onChange={e=>setMovie({...movie,movieID:e.target.value})}>
     
        {
             storeData.movies.map((mov) => {
                 return  <MenuItem key={mov._id} value={mov._id} >{mov.name}</MenuItem>
             })
        }
    </Select><br/>
      <TextField  label="Created Date :" variant="filled" color="success" size="small"  onChange={e=>setMovie({...movie,createDate:e.target.value})} /><br/> <br/> 
      </FormControl>
      <Button variant="contained" color="success" size="small" onClick={save}>
        SUBSCRIPTION
    </Button>
</Box>
    </div>
  );
}

export default AddSubComp;

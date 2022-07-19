import { Box, Button, Checkbox, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AddMovieComp(props) {
const storeData=useSelector(state=>state)
const dispatch=useDispatch()
const [newMovie,setNewMovie]=useState({genres:[],image:"",name:"",premiered:""})
const  navigate=useNavigate()


const save=async()=>{
let header={headers:{"x-access-token":storeData.userDetails.token}}
await axios.post("http://127.0.0.1:5000/subscriptions/movies",newMovie,header).then(data =>{
    let id=data.data
    let movie={genres:newMovie.genres,image:newMovie.image,name:newMovie.name,premiered:newMovie.premiered,_id:id}
    dispatch({type:"ADD MOVIE",payload:movie})
          props.callback(false)
})

}
const cancel=()=>{
props.callback(false)
}


  return (
    <div>
       <Box textAlign={'center'}>
        <h2 style={{color:"green"}}>Add New Moive :</h2>
        <br/>
           <TextField  label="Name :" variant="filled" color="success" onChange={e=>setNewMovie({...newMovie,name:e.target.value})} /><br/> <br/>
           <TextField   label="Geners :" variant="filled" color="success" onChange={e=>setNewMovie({...newMovie,genres:e.target.value.split(',')})} /><br/><br/>
          <TextField  label="Image :" variant="filled" color="success" onChange={e=>setNewMovie({...newMovie,image:e.target.value})} /><br/> <br/>
          <TextField  label="Premiere :" variant="filled" color="success" onChange={e=>setNewMovie({...newMovie,premiered:e.target.value})} /><br/> <br/>

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

export default AddMovieComp;






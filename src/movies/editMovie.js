import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


function EditMovieComp() {

const params=useParams()
const navigate=useNavigate()
const dispatch=useDispatch()
const storeData=useSelector(state=>state)
const [movie,setMovie]=useState()



useEffect(()=>{
  let id =params.id
  let mov=storeData.movies.find(x=>x._id===id)
  setMovie(mov)
},[])


const save=()=>{
console.log(movie);
dispatch({type:"EDIT MOVIE",payload:movie})
navigate('/')
}


const cancel=()=>{
navigate('/')
}

  return (
    <div>
      {
      movie?
      <Box textAlign={'center'}>
        <h2 style={{color:"green"}}>Edit Movie : {movie.name} </h2>
        <br/>
        <TextField value={movie.name} label="Name:" variant="filled" color="success" onChange={e=>setMovie({...movie,movieID:e.target.value})} /><br/> <br/>
        <TextField value={movie.genres} label="Geners:" variant="filled" color="success" onChange={e=>setMovie({...movie,genres:e.target.value.split(',')})} /><br/> <br/>
        <TextField value={movie.image} label="Image URL:" variant="filled" color="success" onChange={e=>setMovie({...movie,image:e.target.value})} /><br/> <br/>
        <TextField value={movie.premiered} label="Premiered:" variant="filled" color="success" onChange={e=>setMovie({...movie,premiered:e.target.value})} /><br/> <br/>


        <Button variant="contained" color="success" size="small" onClick={save}>
          SAVE
        </Button>
        <Button variant="contained" color="success" size="small" onClick={cancel}>
          CANCEL
        </Button><br/>
      </Box>
      :
      <>
      Loading...
      </>
}
    </div>
  );
}

export default EditMovieComp;

import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MovieComp from "./movie";



function AllMoviesComp(props) {
const [search,setSearch]=useState({movie:""})
const [movieSearch,setMovieSearch]=useState({})
const [isAllMovies,setIsAllMovies]=useState(true)
const storeData=useSelector(state=>state)
const movies=storeData.movies


const find=()=>{
let mov=movies.find(x=>x.name==search.movie)
  if (mov){
    setMovieSearch(mov)
    setIsAllMovies(false)
  }
  else{
    setIsAllMovies(true)
    alert("please try again");
  }
}
  return (
    <div>
       <Box  textAlign={'center'}>
      <TextField   label="Find Movie :" variant="filled" color="success"  onChange={e=>setSearch({movie:e.target.value})} /><br/>
     <Button size='large' variant="contained" color="success" onClick={find}>
        FIND 
         </Button>
         </Box>
      {
        isAllMovies?
        movies?
        movies.map(item=>{
          return <MovieComp key={item._id} movie={item} isUpdMovie={props.isUpdMovie} isDelMember={props.isDelMember}/>
        })
        :
        <>
        LOADING...</>
        :
        <MovieComp movie={movieSearch} isUpdMovie={props.isUpdMovie} isDelMember={props.isDelMember}/>
      }
        
    </div>
  );
}

export default AllMoviesComp;

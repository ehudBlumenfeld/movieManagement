import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import checkPermission from "../checkPermission";
import AddMovieComp from "./addMovie";
import AllMoviesComp from "./allMovies";



function MoviesComp() {
const [isAllMovies,setIsAllMovies]=useState(true)
const [isAddMovies,setIsAddMovies]=useState(false)
const [isCreateMovie,setIsCreateMovie]=useState(false)
const [isDelMovie,setIsDelMovies]=useState(false)
const [isUpdMovie,setIsUpdMovies]=useState(false)
const storeData=useSelector(state=>state)


useEffect(()=>{
 if(storeData.userDetails.permissions){
    let per=storeData.userDetails.permissions[0]
    let check=checkPermission(per,"CREATE MOVIE")
    setIsCreateMovie(check)

    check=checkPermission(per,"UPDATE MOVIE")
    setIsUpdMovies(check)

    check=checkPermission(per,"DELETE MOVIE")
    setIsDelMovies(check)

  }
},[isDelMovie,isUpdMovie])

const getMovies=()=>{
setIsAllMovies(true)
setIsAddMovies(false)
}
const addMovie=()=>{
setIsAllMovies(false)
setIsAddMovies(true)
}

  return (
    <div >
      <h2 style={{color:'green'}}>Movies</h2>
      <Button variant="contained" color="success" onClick={getMovies}>
        All Movies 
         </Button>
         {
         isCreateMovie&&<Button variant="contained" color="success" onClick={addMovie}>
          Add Movies 
         </Button>
        }
         <hr/>
    {
      isAllMovies?
      <>
      
      <AllMoviesComp isDelMember={isDelMovie} isUpdMovie={isUpdMovie}/>
      </>
      :
      <>
      {
        null
      }
      </>
    }
      {
      isAddMovies?
      <>
      <AddMovieComp callback={data=>setIsAddMovies(getMovies)}/>
      </>
      :
      <>
      {
        null
      }
      </>
    }     
    </div>
  );
}

export default MoviesComp;

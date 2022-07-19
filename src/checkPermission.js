const checkPermission=(permission,subject)=>
{
switch (subject){
  case "USER MANAGMENT":
    if(permission.CreateMovies && permission.CreateSubscriptions && permission.DeleteMovies && permission.DeleteSubscriptions && permission.UpdateMovies && permission.UpdateSubscriptions && permission.ViewMovies && permission.ViewSubscriptions){
      return true
    }
    else{
      return false
    }
  
  case "MOVIES":
    if(permission.CreateMovies || permission.DeleteMovies ||  permission.UpdateMovies  || permission.ViewMovies){
      return true
    } 
    else{
      return false
    }

  case "SUBSCRIPTION":
    if(permission.CreateSubscriptions || permission.DeleteSubscriptions ||  permission.UpdateSubscriptions  || permission.ViewSubscriptions){
      return true
    } 
    else{
      return false
    }

  case "CREATE MEMBER":
    if (permission.CreateSubscriptions){
      return true
    }
    else{
      return false
    }

   case "CREATE MOVIE":
    if (permission.CreateMovies){
      return true
    }
    else{
      return false
    }

    case "UPDATE MEMBER":
    if (permission.UpdateSubscriptions){
      return true
    }
    else{
      return false
    }

    case "DELETE MEMBER":
      if (permission.DeleteSubscriptions){
      return true
    }
    else{
      return false
  }
  case "UPDATE MOVIE":
    if (permission.UpdateMovies){
      return true
    }
    else{
      return false
  }

  case "DELETE MOVIE":
    if (permission.DeleteMovies){
      return true
    }
    else{
      return false
  }
}
}
export default checkPermission
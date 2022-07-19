import axios from 'axios';

const appReducer=(state={members:[],movies:[],subscriptions:[],usersLogin:[],permissions:[],users:[],userDetails:[]},action)=>
{
 const header={headers:{"x-access-token":state.userDetails.token}}

  
 
  switch (action.type)
  {
    case "LOGIN":
      let token=action.payload.token
      let user=action.payload.user.data
      let permission=action.payload.permissions.data[0].permissions
      let obj={
              "token":token,
              "username":user[0].fname+" "+user[0].lname,
              "created date":user[0].createdDate,
              "id":user[0].id,
              "sessionTimeOut":user[0].sessionTimeOut,
              "permissions":permission
              }
      return {...state,userDetails:obj}

    case "CREATE ACCOUNT":
   //   let header={headers:{"x-access-token":action.payload.token}}
      let objCreate={
              username:action.payload.newIdentify.username,
              password:action.payload.newIdentify.newPassword,
      }              
      let id=action.payload.id
      axios.put("http://127.0.0.1:5000/userslogin/"+id,objCreate,header).then(data =>
                {
                    alert('Created!')           
                })
    case "LOGOUT":
      return{...state,userDetails:[]}

      case "EDIT USER":
        let editUser_permission=action.payload.permissions
        let editUser_userLogin=action.payload.userLogin
        let editUser_user=action.payload.user
      //  let editUser_header={headers:{"x-access-token":state.userDetails.token}}

        axios.put("http://127.0.0.1:5000/permissions/"+editUser_permission.id,editUser_permission,header).then(data =>
                {
                    alert('Permission Updated!')           
                })
        axios.put("http://127.0.0.1:5000/users/"+editUser_user.id,editUser_user,header).then(data =>
                {
                    alert('user Updated!')           
                })
        axios.put("http://127.0.0.1:5000/userslogin/"+editUser_userLogin.id,editUser_userLogin,header).then(data =>
                {
                    alert('userLogin Updated!')           
                })
             return{...state,permissions:[editUser_permission],usersLogin:[editUser_userLogin],users:[editUser_user]}   
            
    case "ADD USER":
      let addNewPermission=action.payload.permissions
      let addNewUser=action.payload.user
      let addNewUserLogin=action.payload.userLogin                       
      axios.post("http://127.0.0.1:5000/users",addNewUser,header)
      axios.post("http://127.0.0.1:5000/permissions",addNewPermission,header) 
      let addNewPermissions=[...state.permissions,addNewPermission]
      let addNewUsersLogin=[...state.usersLogin,addNewUserLogin]
      let addNewUsers=[...state.users,addNewUser]
                return {...state,
                      permissions:addNewPermissions,
                      usersLogin:addNewUsersLogin, 
                      users:addNewUsers
                    }                                                

                
                
              
                
                  
               
              
    case "DELETE USER":
      let delId=action.payload     
      let delUserLogin=state.usersLogin
      let delUser=state.users
      let delPermiision=state.permissions
      let indexDelUserLogin = delUserLogin.findIndex(x => x._id == delId);
      let indexDelUser = delUser.findIndex(x => x.id == delId);
      let indexDelPermission = delPermiision.findIndex(x => x.id == delId);
      if(indexDelUserLogin >= 0)
            {
            axios.delete("http://127.0.0.1:5000/userslogin/"+delId,header)               
            delUserLogin.splice(indexDelUserLogin,1)                
            }
      if(indexDelUser >= 0)
            {
            axios.delete("http://127.0.0.1:5000/users/"+delId,header)              
            delUser.splice(indexDelUser,1)                
            }
      if(indexDelPermission >= 0)
            {
            axios.delete("http://127.0.0.1:5000/permissions/"+delId,header)
            delPermiision.splice(indexDelPermission,1)                
            } 
      return {...state,
              usersLogin:delUserLogin,
              users:delUser,
              permissions:delPermiision
            }     
    case "EDIT MOVIE":
      let editMovie=action.payload
      let allMovie_edit=state.movies
      let indexEdit=allMovie_edit.findIndex(x=>x._id==editMovie._id)
      if (indexEdit>=0){
        allMovie_edit[indexEdit]=editMovie
      }
      axios.put("http://127.0.0.1:5000/subscriptions/movies/"+editMovie._id,editMovie,header).then(()=>{
        alert("Updated !!!")
      })
      return {...state,movies:allMovie_edit}

  case "ADD MOVIE":
    let newMovie=action.payload
      return {...state,movies:[...state.movies,newMovie]}

  case "DELETE MOVIE":
   let delMovieId=action.payload
   let arrMovieDel=state.movies
   let arrMovie_subDel=state.subscriptions
    if(arrMovie_subDel>0){
        arrMovie_subDel.forEach(element=>{
          let sub_movID=element._id
          let indexInSub=0
          element.movies.forEach(elem=>{
            if(elem.movieID===delMovieId){
              elem.splice(indexInSub,1)
              axios.put("http://127.0.0.1:5000/subscriptions/subscriptions/"+sub_movID,elem,header)
            }
          })
        })   
      }      
  let indexMovDel=arrMovieDel.findIndex(x=>x._id===delMovieId)
    console.log(indexMovDel)
  if (indexMovDel>=0){
  
      arrMovieDel.splice(indexMovDel,1)
      axios.delete("http://127.0.0.1:5000/subscriptions/movies/"+delMovieId,header).then(()=>{
        alert("deleted!!!")
      })
      
      }
      return {...state,
      movies:arrMovieDel,
      subscriptions:arrMovie_subDel}  
      
      case "ADD NEW SUBSCRIBE":
        let newSub=action.payload      
        return {...state,subscriptions:[...state.subscriptions,newSub]}
  
      case "ADD SUBSCRIBE":
        let addSub=action.payload
         axios.put("http://127.0.0.1:5000/subscriptions/subscriptions/"+addSub._id,addSub,header)
        return {...state,subscriptions:[...state.subscriptions,addSub]}

      case "EDIT MEMBER":
        let editMember=action.payload
        let allMember_edit=state.members
        let indexEditMember=allMember_edit.findIndex(x=>x._id==editMember._id)
        if (indexEditMember>=0){
        allMember_edit[indexEditMember]=editMember
        axios.put("http://127.0.0.1:5000/subscriptions/members/"+editMember._id,editMember,header).then(()=>{
        alert("Updated !!!")
      })
      }   
      return {...state,members:allMember_edit}
      

    case "ADD MEMBER":
      let newMember=action.payload       
        return {...state,members:[...state.members,newMember]}

    case "DELETE MEMBER":
      let delMemberId=action.payload
      let arrMemberDel=state.members
      let arrSubDel=state.subscriptions
          if(arrSubDel.length>0){
            let indexSub=arrSubDel.findIndex(x=>x.memberID==delMemberId)
              if(indexSub>=0){
                axios.delete("http://127.0.0.1:5000/subscriptions/subscriptions/"+arrSubDel[indexSub]._id,header)
                arrSubDel.splice(indexSub,1)
              }
            }
          let indexArrMemberDel=arrMemberDel.findIndex(x=>x._id==delMemberId)  
          if(indexArrMemberDel>=0){
              axios.delete("http://127.0.0.1:5000/subscriptions/members/"+delMemberId,header)
              arrMemberDel.splice(indexArrMemberDel,1)
              alert("DELETED !!!")
          }
      return {...state,
      members:arrMemberDel,
      subscriptions:arrSubDel}  
      

    case "LOAD MOVIES":
      return{...state, movies:action.payload}

    case "LOAD MEMBERS":
     return{...state, members:action.payload}

    case "LOAD SUBSCRIPTIONS":
      return{...state, subscriptions:action.payload}

    case "LOAD USERS LOGIN":
      return{...state, usersLogin:action.payload}

    case "LOAD PERMISSIONS":
      return{...state, permissions:action.payload}

    case "LOAD USERS":
      return{...state, users:action.payload}

    default:return state;
  }


}

export default appReducer;
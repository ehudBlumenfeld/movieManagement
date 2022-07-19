const UserData=(storeData)=>
{
     let data=[]
storeData.usersLogin.forEach(login => {  
    let id=login._id
      storeData.users.forEach(user=>{
        if (user.id===id){
          storeData.permissions.forEach(per=>{
            if (per.id===id){
              let permis=[]
              if(per.permissions[0].CreateMovies===true){
                
                permis.push("Create Movies")
              }
                if(per.permissions[0].CreateSubscriptions===true){
                  permis.push("Create Subscriptions")
              }              
                if(per.permissions[0].DeleteMovies===true){
                  permis.push("Delete Movies")
              }             
                if(per.permissions[0].DeleteSubscriptions===true){
                  permis.push("Delete Subscriptions")
              }
                if(per.permissions[0].ViewMovies===true){
                  permis.push("View Movies")
              }
                if(per.permissions[0].ViewSubscriptions===true){
                  permis.push("View Subscriptions")
              }  
              if(per.permissions[0].UpdateSubscriptions===true){
                  permis.push("Update Subscriptions")
              }
              if(per.permissions[0].UpdateMovies===true){
                  permis.push("Update Movie")
              } 
              
              let obj={id:id,fname:user.fname,lname:user.lname,username:login.username,sessionTimeOut:user.sessionTimeOut,createDate:user.createdDate,permissions:permis,password:login.password}
              data.push(obj)             
            }
          })
        }
      })
  })
  return data
}
export default UserData
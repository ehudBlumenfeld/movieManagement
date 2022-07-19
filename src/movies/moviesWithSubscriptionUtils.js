const moviesWithSub=(storeData,movie)=>
{
let subscription=[] 
    storeData.subscriptions.forEach(sub => {
        sub.movies.forEach(mov => {
            if(mov.movieID==movie._id){
            let name=storeData.members.find(x=>x._id==sub.memberID).name
            let obj={name:name,
            memberID:sub.memberID,
            createDate:mov.createDate
            }
                subscription.push(obj)
            }
        })
    });
       //console.log(subscription)
              return subscription       
}
export default moviesWithSub
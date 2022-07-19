const memberWithSub=(storeData,member)=>
{
let subscription= storeData.subscriptions.find(x=>x.memberID===member._id)
    if(subscription){
       let new_subscription={_id:subscription._id,
              memberID:subscription.memberID,
              movies:[]
              } 
      subscription.movies.forEach(movie => {
        let mov=storeData.movies.find(x=>x._id===movie.movieID)
        if (mov){
          let movi={createDate:movie.createDate,
          movieID:movie.movieID,
          name:mov.name}
          new_subscription.movies.push(movi)
        }
      });
       
              return new_subscription
    }
    
}
export default memberWithSub
export function GeneralStats({generalInformation})
{
  return(
    <>
         <div className="grid text-center grid-cols-2">
          <div>
            <h1 className="text-4xl">{generalInformation.follower}</h1>
            <h1 className="text-[0.9rem]">
               Followers
            </h1>
          </div>
          <div>
        
            <h1 className="text-4xl">{generalInformation.following}</h1>
            <h1 className="text-[0.9rem]">
               Following
            </h1>
          
          </div>
           <div className="mt-6 grid col-span-2">
             <h2 className="text-[1.2rem]">
                Starred repos : {generalInformation.starredRepos}
             </h2>
             <h2 className="text-[1.2rem]">
                Public repos : {generalInformation.publicRepos}
             </h2>
             
           </div>
           <div className="grid col-span-2 mt-6">
           <p className="text-[0.9rem]">
               Pushing code since {generalInformation.createdAt}
               </p>
           </div>
         </div>
    </>
  )
}


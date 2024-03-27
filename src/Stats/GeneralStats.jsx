export function GeneralStats({generalInformation})
{
  return(
    <>
         <div className="grid grid-cols-2">
          <div>
            <h1 className="text-[1.5rem]">
               Followers
            </h1>
            <h2 className="text-2xl">{generalInformation.follower}</h2>
          </div>
          <div>
            <h1 className="text-[1.5rem]">
               Following
            </h1>
            <p className="text-2xl">{generalInformation.following}</p>
          </div>
           <div className="grid col-span-2">
             <h2 className="text-[1.2rem]">
                Starred repos : 
             </h2>
             <h2 className="text-[1.2rem]">
                Public repos : {generalInformation.publicRepos}
             </h2>
           </div>
         </div>
    </>
  )
}


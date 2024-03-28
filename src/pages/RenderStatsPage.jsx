import Card from "../component/Card"
import { GeneralStats } from "../Stats/GeneralStats";
import {  useRecoilValue} from "recoil";
import Topbar from "../section/Topbar";
import { responseAtomFamily } from "../store/APIResponse";
import { useContext,useMemo } from "react";
import Picture from "../component/Picture";
import UsernameContext from "../context/UsernameContext";
import { starredRepoAtomFamily } from "../store/APIResponse";
export default function RenderStatsPage()
{
  
  const {username} = useContext(UsernameContext)
  const response = useRecoilValue(responseAtomFamily(username)) || useRecoilValue(responseAtomFamily("AnindoChoudhury")) 
  const starred = useRecoilValue(starredRepoAtomFamily(username)) || useRecoilValue(starredRepoAtomFamily("AnindoChoudhury"));

  const author = ()=>
  (
    username==="AnindoChoudhury"? " (author)" : ""
  )

  const generalInformation = useMemo(()=>
  {
    return {
      follower : response["followers"] , 
      following : response["following"] , 
      publicRepos : response["public_repos"] ,
      starredRepos : starred.length,
      createdAt : new Date(response["created_at"]).toLocaleString("en-IN"), 
    }
  },[response])

  if(response)
  return(
    <div className="renderStatsPage flex pb-10 items-center gap-10 flex-col pt-0">
      <Topbar/>  
        <Picture url={response["avatar_url"]}/>
        <div className="text-white w-[75%] flex flex-col items-center">
        <h2 className="text-xl pb-2">{`${response["name"]}${author()}`}</h2>
        <p className="text-center">{response["bio"]}</p>
        </div>
      <Card cardContent={<GeneralStats generalInformation={generalInformation}/>}/>
      
    </div>)
    return(
         <Topbar/>
    )
}



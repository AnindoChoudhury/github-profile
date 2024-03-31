import Card from "../component/Card"
import { GeneralStats } from "../Stats/GeneralStats";
import {  useRecoilValue} from "recoil";
import Topbar from "../section/Topbar";
import { responseAtomFamily} from "../store/APIResponse";
import { useContext,useMemo } from "react";
import Picture from "../component/Picture";
import UsernameContext from "../context/UsernameContext";
import PNG from "../section/PNG";
export default function RenderStatsPage()
{
  const {username} = useContext(UsernameContext)
  const response = useRecoilValue(responseAtomFamily({
    username : username, 
  })) || useRecoilValue(responseAtomFamily("AnindoChoudhury")) 

  // Number of collabs
  const collabs = response.contributionsCollection.commitContributionsByRepository.filter((item)=>(item.repository.owner.login!==username)).length; 

  // const collabNames = response.contributionsCollection.commitContributionsByRepository.map((item)=>{if(item.repository.owner.login!==username) return item.repository.name}).join(" "); 

  // Number of PRs 
  const pullRequests = response.contributionsCollection.totalPullRequestContributions

  // Number of commits
  const commits = response.contributionsCollection.totalCommitContributions

  // Number of issues
  const issues = response.contributionsCollection.totalIssueContributions

 

  const author = ()=>
  (
    username==="AnindoChoudhury"? " (author)" : ""
  )

  const generalInformation = useMemo(()=>
  {
    return {
      username : username, 
      contributions : response.contributionsCollection.contributionCalendar.totalContributions,
      contributionsGraph : `https://ghchart.rshah.org/D6589F/${username}`,
      imageURL : response.avatarUrl,
      follower : response.followers.totalCount , 
      following : response.following.totalCount , 
      publicRepos : response.repositories.totalCount ,
      createdAt : new Date(response["createdAt"]).toLocaleString("en-IN"), 
      name : response.name,
      collabs : collabs,
      numberOfPullRequests : pullRequests, 
      numberOfCommits : commits, 
      numberOfIssues : issues, 
    }
  },[response])
  
  if(response)
  return(
    <div className="renderStatsPage flex pb-10 items-center gap-10 flex-col pt-0">
      <Topbar/>  
      <PNG generalInformation={generalInformation}/>
        <Picture url={generalInformation.imageURL}/>
        <div className="text-white w-[75%] flex flex-col items-center">
        <h2 className="text-xl pb-2">{`${generalInformation.name}${author()}`}</h2>
        <p className="text-center">{generalInformation.bio}</p>
        </div>
      <Card cardContent={<GeneralStats generalInformation={generalInformation}/>}/>
      
    </div>
    )
    return(
         <Topbar/>
    )
}



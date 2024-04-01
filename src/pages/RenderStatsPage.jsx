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
  })) || useRecoilValue(responseAtomFamily({username : "AnindoChoudhury"})) 

  // Number of collabs
  const collabs = response.contributionsCollection.commitContributionsByRepository.filter((item)=>(item.repository.owner.login!==username)).length; 

  // const collabNames = response.contributionsCollection.commitContributionsByRepository.map((item)=>{if(item.repository.owner.login!==username) return item.repository.name}).join(" "); 

  // Number of PRs 
  const pullRequests = response.contributionsCollection.totalPullRequestContributions

  // Number of commits
  const commits = response.contributionsCollection.totalCommitContributions

  // Number of issues
  const issues = response.contributionsCollection.totalIssueContributions

  const pullRequestArray = response.contributionsCollection.pullRequestContributions.edges

  // Number of merged pull requests
  let merged, firstMerge 
  if(pullRequestArray.length)
  {
    merged = pullRequestArray.filter((item)=>(item.node?.pullRequest?.merged)).length
 
   firstMerge = new Date(pullRequestArray[pullRequestArray.length-1].node?.pullRequest?.createdAt).toLocaleString("en-IN");
  }
  else 
  {
    merged = 0;
    firstMerge = "Invalid"
  }

  const repoArray = response.repositories.edges
 // Max Starred Repo 
 const maxStarred = repoArray.reduce((acc,item)=>(acc.node.stargazerCount>item.node.stargazerCount?acc : item)); 
 const maxStarredRepo = maxStarred.node.name; 
 
//  Primary language 
const map=new Map(); 

// Iterates over the repo array containg object (which contains details about the repo including the primary language)
for(const item of repoArray)
 {
       let primaryLanguageName
       if(item.node.primaryLanguage)  // If primary language exists, set primaryLanguageName
       {  
          primaryLanguageName = item.node.primaryLanguage.name 
       }

       // If the repo isn't forked & primary language exists, create a key value pair. For example 
       // Js => 3, where key is the language and value is the number of Repositories it has been used in
       if(!item.node.isFork && primaryLanguageName) 
       { 
        map.set(primaryLanguageName,map.get(primaryLanguageName)+1 || +!Boolean(map.get(primaryLanguageName)))
       }
 }
 console.log(map)
 // Find out the maximum value, and print its key
 let maxUsage=0, maxUsedLanguage; 
 for(const item of map.entries())
 {
    if(item[1]>maxUsage)
    {
      maxUsage = item[1]
      maxUsedLanguage = item[0]
    }
 }
 console.log(maxUsedLanguage)
 
  const author = ()=>
  (
    username==="AnindoChoudury"? " (author)" : ""
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
      merged : merged, 
      firstMerge : firstMerge, 
      maxStarred : maxStarredRepo
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



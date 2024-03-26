import Card from "../component/Card"
import { GeneralStats } from "../Stats/GeneralStats";
import {  useRecoilValue} from "recoil";
import Topbar from "../section/Topbar";
import { responseAtomFamily } from "../store/APIResponse";
import { useContext } from "react";
import Picture from "../component/Picture";
import UsernameContext from "../context/UsernameContext";
export default function RenderStatsPage()
{
  
  const {username} = useContext(UsernameContext)
  const response = useRecoilValue(responseAtomFamily(username)) || useRecoilValue(responseAtomFamily("AnindoChoudhury"))
  if(response)
  return(
    <div className="bg-[#03001C] h-[100vh] flex items-center gap-10 flex-col pt-0">
      <Topbar/>
        <Picture url={response["avatar_url"]}/>
        <div className="text-white flex flex-col items-center">
        <h2 className="text-xl">{response["name"]}</h2>
        <p>{response["bio"]}</p>
        </div>
      <Card cardContent={<GeneralStats/>}/>
    </div>)
    return(
         <Topbar/>
    )
}
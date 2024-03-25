import Card from "../component/Card"
import { GeneralStats } from "../Stats/GeneralStats";
import {useEffect} from "react";
import axios from "axios"
import Topbar from "../section/topbar";
export default function RenderStatsPage()
{
  useEffect(()=>
  {
    axios.get("https://api.github.com/users/AnindoChoudhury").then((res)=>
    {
      console.log(res.data.avatar_url);
    }).catch((err)=>
    {
      console.log("Error");
    })
  },[])
  return(
    <div className="flex items-center gap-10 flex-col pt-0">
      <Topbar/>
      <Card cardContent={<GeneralStats/>}/>
    </div>)
}
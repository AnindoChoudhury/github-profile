import Card from "../component/Card"
import { GeneralStats } from "../Stats/GeneralStats";
import { responseAtomFamily } from "../store/APIResponse";
import { RecoilRoot, useRecoilValueLoadable, useRecoilValue } from "recoil";
import Picture from "../component/Picture";
import Topbar from "../section/Topbar";
export default function RenderStatsPage()
{
  // const username = useRecoilValue(responseAtomFamily("name","AnindoChoudhury"))
  // const imageURL = useRecoilValue(responseAtomFamily("avatar_url","AnindoChoudhury"))

  return(
    <div className="flex items-center gap-10 flex-col pt-0">
      <RecoilRoot><Topbar/></RecoilRoot>
      {/* <Picture url={imageURL}/>
      <h2 className="text-xl">{username}</h2> */}
      <Card cardContent={<GeneralStats/>}/>
    </div>)
}
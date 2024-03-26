import Card from "../component/Card"
import { GeneralStats } from "../Stats/GeneralStats";
import { RecoilRoot, useRecoilValue} from "recoil";
import Topbar from "../section/Topbar";
import { responseAtomFamily } from "../store/APIResponse";
import { usernameAtom } from "../store/input";
import { useEffect } from "react";
import Picture from "../component/Picture";
export default function RenderStatsPage()
{
  const username = useRecoilValue(usernameAtom);

  const response = useRecoilValue(responseAtomFamily(username)) || undefined
  return(
    <div className="flex items-center gap-10 flex-col pt-0">
      <RecoilRoot><Topbar/></RecoilRoot>
      {/* <Picture url={response["avatar_url"]}/> */}
      {/* <h2 className="text-xl">{response.name || "Anin"}</h2> */}
      <Card cardContent={<GeneralStats/>}/>
    </div>)
}
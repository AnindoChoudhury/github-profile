import { Button } from "../component/Input"
import { useNavigate } from "react-router-dom"
import {responseAtomFamily} from "../store/APIResponse"
import {useRecoilValue } from "recoil";
import { useEffect } from "react";
export default function Topbar()
{

    const navigate = useNavigate();
    const response=useRecoilValue(responseAtomFamily("Firdous19"))
    const handleHome = ()=>
    {   
        navigate("/");
        console.log(response);
    }
    return(
        <div className="w-full mt-0 h-[4rem] p-5">
        <Button text="Home" handleSubmit={handleHome}/>
        </div>
    )
}
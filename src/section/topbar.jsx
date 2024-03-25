import { useCallback } from "react";
import { Button } from "../component/Input"
import { useNavigate } from "react-router-dom"
export default function Topbar()
{
    const navigate = useNavigate(); 
    const handleHome = ()=>
    {  
        navigate("/");
    }
    return(
        <div className="w-full mt-0 h-[4rem] p-5">
        <Button text="Home" handleSubmit={handleHome}/>
        </div>
    )
}
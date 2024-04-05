import { Button } from "../component/Input"
import { useNavigate } from "react-router-dom"
export default function Topbar()
{
 
    const navigate = useNavigate();
    const handleHome = ()=>
    {   
        navigate("/");
    }
    const download = ()=>
    {
        console.log("download")
    }
    return(
        <div className="w-full mt-0 h-[5rem] flex justify-between items-center p-4">
        <Button text="Home" handleSubmit={handleHome} primaryColor="bg-red-700" hoverColor="dark:hover:bg-red-900"/>
        <Button text="Download" handleSubmit={download} primaryColor="bg-red-700" hoverColor="dark:hover:bg-red-900"/>
        </div>
    )
}
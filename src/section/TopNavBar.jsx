import { Button } from "../component/Input"
import { useNavigate } from "react-router-dom"
export default function TopNavBar()
{
   
    const navigate = useNavigate();
    const handleHome = ()=>
    {   
        navigate("/");
    }
    return(
        <div className="w-full mt-0 h-[5rem] flex justify-between items-center p-4">
        <Button text="Home" handleSubmit={handleHome} primaryColor="bg-red-700" hoverColor="dark:hover:bg-red-900"/>
        </div>
    )
}

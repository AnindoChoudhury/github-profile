import { usernameAtom } from "../store/input"
import {useSetRecoilState,useRecoilValue} from "recoil"
import {useNavigate} from "react-router-dom"
import { useCallback,memo } from "react"
export function Input()
{
    const navigate = useNavigate()
    const setUsername = useSetRecoilState(usernameAtom)
    const handleSubmit = useCallback(()=>
    {
        navigate("/stats")
    },[])
    return(
        <div className="w-[100%] h-[100vh] flex items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-5">
            <input onChange={(e)=>
            {
                setUsername(e.target.value)
            }} type="text" placeholder="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <Button handleSubmit={handleSubmit} text="submit"/>
            </div>
        </div>
    )
}

export const Button=memo(({handleSubmit, text})=>
{
    return(
    <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{text}</button>)
})
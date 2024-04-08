
import { usernameAtom } from "../store/input";

import { useRecoilState } from "recoil";
import { useRef } from "react";
import UsernameContext from "./UsernameContext";

const UsernameContextProvider = ({children})=>
{
    const [username,setUsername]=useRecoilState(usernameAtom)
    const pngRef = useRef(null)
    return(
    <UsernameContext.Provider value={{username,setUsername,pngRef}}>
         {children}
    </UsernameContext.Provider>)    
}

export default UsernameContextProvider
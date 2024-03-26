
import { usernameAtom } from "../store/input";

import { useRecoilState } from "recoil";

import UsernameContext from "./UsernameContext";

const UsernameContextProvider = ({children})=>
{
    const [username,setUsername]=useRecoilState(usernameAtom)
    return(
    <UsernameContext.Provider value={{username,setUsername}}>
         {children}
    </UsernameContext.Provider>)
}

export default UsernameContextProvider
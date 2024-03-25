import {atomFamily, selectorFamily} from "recoil"
import axios from "axios"
export const responseAtomFamily = atomFamily({
    key : "responseAtomFamily",
    default : selectorFamily({
        key :"responseSelectorFamily",
        get : (id)=>async()=>{
            try
            {
              const res = await axios.get(`https://api.github.com/users/${id}`)
              return res.data
            }
            catch(err)
            {
                return err; 
            }
        }
    })
})
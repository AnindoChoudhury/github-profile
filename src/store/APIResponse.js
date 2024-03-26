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
                console.log("Username doesn't exist")
            }
        } 
    })
})

// export const propertySelectorFamily=selectorFamily({
//     key : "propertySelector", 
//     get : (id)=>({get})=>
//     {
//         const property = get(responseAtomFamily());
//         return property[id];
//     }
// })
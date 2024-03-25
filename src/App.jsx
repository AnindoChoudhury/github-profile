import { Suspense } from "react"
import "./App.css"
import {lazy} from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
const RenderStatsPage = lazy(()=>import("./pages/RenderStatsPage"))
const InputPage = lazy(()=>import("./pages/InputPage"))
export default function App()
{
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Suspense fallback="loading..."><InputPage/></Suspense>}></Route>
            <Route path="/stats" element={
               <Suspense fallback="loading...">
                 <RecoilRoot>
                  <RenderStatsPage/>
                 </RecoilRoot>
               </Suspense>}>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}




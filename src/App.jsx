import { Suspense } from "react"
import "./App.css"
import {lazy} from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
import UsernameContextProvider from "./context/UsernameContextProvider"
const RenderStatsPage = lazy(()=>import("./pages/RenderStatsPage"))
const InputPage = lazy(()=>import("./pages/InputPage"))
export default function App()
{
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={
            <Suspense fallback="loading...">
               <RecoilRoot>
                  <UsernameContextProvider>
                  <InputPage/>
                  </UsernameContextProvider>
                </RecoilRoot>
               </Suspense>}>
            </Route>
            <Route path="/stats" element={
               <Suspense fallback="loading stats page...">
                 <RecoilRoot>
                  <UsernameContextProvider>
                      <RenderStatsPage/>
                  </UsernameContextProvider>
                 </RecoilRoot>
               </Suspense>}>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}




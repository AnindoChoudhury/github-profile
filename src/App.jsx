import { Suspense } from "react"
import "./App.css"
import {lazy} from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
import UsernameContextProvider from "./context/UsernameContextProvider"
const RenderStatsPage = lazy(()=>import("./pages/RenderStatsPage"))
const InputPage = lazy(()=>import("./pages/InputPage"))
import Loader from "./component/Loader"
export default function App()
{
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={
            <Suspense fallback={<Loader text="Please wait"/>}>
               <RecoilRoot>
                  <UsernameContextProvider>
                  <InputPage/>
                  </UsernameContextProvider>
                </RecoilRoot>
               </Suspense>}>
            </Route>
            <Route path="/stats" element={
               <Suspense fallback={<Loader text="Loading Statistics"/>}>
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




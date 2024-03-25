import Card from "./component/Card"
import { GeneralStats } from "./Stats/GeneralStats"
import { Suspense, useEffect } from "react"
import axios from "axios"
import {RecoilRoot} from "recoil"
import "./App.css"
import { lazy } from "react"
import {Input} from "./component/Input"
import { BrowserRouter,Routes,Route } from "react-router-dom"
const RenderStatsPage = lazy(()=>import("./pages/RenderStatsPage"))
const InputPage = lazy(()=>import("./pages/InputPage"))
export default function App()
{
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Suspense fallback="loading..."><InputPage/></Suspense>}></Route>
            <Route path="/stats" element={ <Suspense fallback="loading..."><RenderStatsPage/></Suspense>}></Route>
        </Routes>
    </BrowserRouter>
  )
}




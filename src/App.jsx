import { Suspense } from "react"
import "./App.css"
import { lazy } from "react"
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




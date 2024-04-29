import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Reservas from './pages/Reservas'
import Login from './components/Login'
import Layout from './Layouts/Layout'
export default function AppRouter() {
  return (
   <BrowserRouter>
   <Routes>
    <Route element={<Layout/>}>
    <Route path='/' element={<Home/>} index/>
    
    </Route>
    <Route path='/reservas' element={<Reservas/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes>
   
   </BrowserRouter>
  )
}

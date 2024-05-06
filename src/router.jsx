import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Reservas from './pages/Reservas'
import Login from './components/Login'
import Layout from './Layouts/Layout'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/utils/ProtectedRoute'
import { useLocalStorage } from 'react-use'

export default function AppRouter() {

  const [user, setUser] = useLocalStorage('user');

  return (
   <BrowserRouter>
   <Routes>
    <Route element={<Layout/>}>
    <Route path='/' element={<Home/>} index/>
    <Route path='/dashboard' element={<Dashboard/>} index/>
    </Route>
    <Route element={<ProtectedRoute userActived={user}/>}>
    <Route path='/reservas' element={<Reservas/>}/>
    </Route>
   </Routes>
   
   </BrowserRouter>
  )
}

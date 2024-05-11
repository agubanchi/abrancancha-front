import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Reservas from './pages/Reservas'
import Logueo from './Layouts/Logueo'
import LoginUser from './components/LoginUser'
import RegisterUser from './components/RegisterUser'
import Layout from './Layouts/Layout'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/utils/ProtectedRoute'
import { useLocalStorage } from 'react-use'

export default function AppRouter() {

  const [user, setUser] = useLocalStorage('user');

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>} index/>
    <Route element={<Logueo/>}>
    <Route path='/login' element={<LoginUser />} />
          <Route path='/registrar' element={<RegisterUser />} />
    <Route element={<ProtectedRoute userActived={user}/>}>
    <Route path='/reservas' element={<Reservas/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Route>
    </Route>
   </Routes>
   
   </BrowserRouter>
  )
}
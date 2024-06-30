import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Reservations from "./pages/Reservations"
import Reservas from "./pages/Reservas";
import ProtectedRoute from "./components/utils/ProtectedRoute"; // Importar ProtectedRoute
import Home from "./pages/Home";
import Logueo from "./Layouts/Logueo";
import PrivateRoute from "./components/utils/PrivateRoute";
import Layout from "./Layouts/Layout";
import Users from "./pages/Users";
import Admins from "./pages/Admins";
import Canchas from "./pages/Canchas";

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
    <Route path='/' element={<Home/>} index/>
    <Route element={<Logueo/>}>
    <Route path='/login' element={<LoginUser />} />
    <Route path='/registrar' element={<RegisterUser />} />
    </Route>
    <Route element={<PrivateRoute roles={["user", "admin"]}/>}>
    <Route element={<Logueo/>}>
    <Route path='/reservas' element={<Reservas/>} roles={["user"]}/>
    </Route>
    <Route element={<Layout/>}>
    <Route path='/canchas' element={<Canchas/>} roles={["admin"]}/>
    <Route path='/reservations' element={<Reservations/>} roles={["admin"]}/>
    <Route path='/users' element={<Users/>} roles={["admin"]}/>
    <Route path='/admins' element={<Admins/>} roles={["admin"]}/>
    </Route>
    </Route>
    {/* <Route path='*' element={<Missing/>} /> */}
   </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;

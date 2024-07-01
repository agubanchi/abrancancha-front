import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";
import ProtectedRoute from "./components/utils/ProtectedRoute"; // Importar ProtectedRoute
import Home from "./pages/Home";
import Logueo from "./Layouts/Logueo";
import PrivateRoute from "./components/utils/PrivateRoute";
import Layout from "./Layouts/Layout";

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
    <Route path='/dashboard' element={<Dashboard/>} roles={["admin"]}/>
    </Route>
    </Route>
    
   </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;

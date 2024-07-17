import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, Role } from "./context/AuthContext";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Dashboard from "./pages/Dashboard";
import Reservations from "./pages/Reservations"
import Reservas from "./pages/Reservas";
// import ProtectedRoute from "./components/utils/ProtectedRoute"; // Importar ProtectedRoute
import Home from "./pages/Home";
import Logueo from "./Layouts/Logueo";
import PrivateRoute from "./components/utils/PrivateRoute";
import Layout from "./Layouts/Layout";
import Users from "./pages/Users";
// import Admins from "./pages/Admins";
import DetailsTables from "./pages/DetailsTables";
import Canchas from "./pages/Canchas";
import { Endpoint } from "./services/fetchs";
// import Configuracion from "./pages/Configuracion";
import LayoutConfig from "./Layouts/LayoutConfig";
import LoginReset from "./components/LoginReset";

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route element={<Logueo />}>
            <Route path="/login" element={<LoginUser />} />
            <Route path="/registrar" element={<RegisterUser />} />
            <Route path="/reset" element={<LoginReset />} />
            <Route path="/reset/:resetPassToken" element={<LoginReset />} />
          </Route>
          <Route element={<PrivateRoute roles={[Role.User, Role.Admin]} />}>
            <Route element={<Logueo />}>
              <Route path="/reservas" element={<Reservas />} roles={[Role.User]} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} roles={[Role.Admin]} />
              <Route
                path="/reservations"
                element={<Reservations />}
                roles={[Role.Admin]}
              />
              <Route path="/canchas" element={<Canchas />} roles={[Role.Admin]} />
              {/* <Route path="/users" element={<Users />} roles={[Role.Admin]} />
              <Route path="/admins" element={<Admins />} roles={[Role.Admin]} /> */}
              <Route path="/users" element={<Users endPoint={Endpoint.users} />} />
              {/* <Route path="/configuracion" element={<Configuracion  />} /> */}
              <Route element={<LayoutConfig />}>
              <Route path="/admins" element={<Users endPoint={Endpoint.administrators} />} />
              <Route path="/tiposCanchas" element={<DetailsTables endPoint={Endpoint.typesOfCourt}/>} />
              <Route path="/estadosCanchas" element={<DetailsTables endPoint={Endpoint.statusOfCourt}/>} />
              <Route path="/estadosReservas" element={<DetailsTables endPoint={Endpoint.statusOfReservation}/>} />
              <Route path="/estadosUsuarios" element={<DetailsTables endPoint={Endpoint.statusOfUser}/>} />
              {/* tarifas, horarios, agendas, exepciones, club */}
              </Route>
            </Route>
          </Route>
          {/* <Route path='*' element={<Missing/>} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;

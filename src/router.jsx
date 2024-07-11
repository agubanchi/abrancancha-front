import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, Role } from './context/AuthContext';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import Reservations from './pages/Reservations';
import Reservas from './pages/Reservas';
import ProtectedRoute from './components/utils/ProtectedRoute'; // Importar ProtectedRoute
import Home from './pages/Home';
import Logueo from './Layouts/Logueo';
import PrivateRoute from './components/utils/PrivateRoute';
import Layout from './Layouts/Layout';
import Users from './pages/Users';
import Admins from './pages/Admins';
import Canchas from './pages/Canchas';

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route element={<Logueo />}>
            <Route path="/login" element={<LoginUser />} />
            <Route path="/registrar" element={<RegisterUser />} />
          </Route>
          <Route element={<PrivateRoute roles={[Role.User, Role.Admin]} />}>
            <Route element={<Logueo />}>
              <Route path="/reservas" element={<Reservas />} roles={[Role.User]} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/canchas" element={<Canchas />} roles={[Role.Admin]} />
              <Route
                path="/reservations"
                element={<Reservations />}
                roles={[Role.Admin]}
              />
              <Route path="/users" element={<Users />} roles={[Role.Admin]} />
              <Route path="/admins" element={<Admins />} roles={[Role.Admin]} />
            </Route>
          </Route>
          {/* <Route path='*' element={<Missing/>} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;

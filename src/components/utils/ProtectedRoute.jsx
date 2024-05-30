import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Reservas from "../../pages/Reservas";
import Dashboard from "../../pages/Dashboard";

const ProtectedRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>
};

export default ProtectedRouter;

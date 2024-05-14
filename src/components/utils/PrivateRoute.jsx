import React from "react";
import { Route } from "react-router-dom";
import ProtectedRouter from "./ProtectedRoute";

const PrivateRoute = ({ element, roles }) => {
  return <ProtectedRouter element={element} roles={roles} />;
};

export default PrivateRoute;

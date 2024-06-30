import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAll, HttpMethod } from "../services/fetchs";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
// export const useAuth = () => {
//   const { auth } = useContext(AuthContext);
//   // useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
//   return useContext(AuthContext);
// };

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [reservations, setReservations] = useState(() => {
    const storedReservations = localStorage.getItem("reservations");
    return storedReservations ? JSON.parse(storedReservations) : [];
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : [];
  });
  // const [dbHandler, setDbHandler] = useState(() => {
  //   const storedToken = localStorage.getItem('token');
  //   return storedToken ? JSON.parse(storedToken) : [];
  // });
    // const [loginUser, fetchLogin] = useState(""); //<-esta la puse yo: mario
  // const {fetchCreate} = useFetch(Endpoint.login); //<-esta la puse yo: mario

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations)); // Guardar Reservas en el almacenamiento local
    localStorage.setItem("users", JSON.stringify(users)); // Guardar usuarios en el almacenamiento local
  }, [reservations, users]); //guardar los usuarios y reservas cuando cambian

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    setToken(token);
    setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    setToken(null);
  };
  //-----------------------------------------------------------------------------+
  const fetchGet = async ({ endPoint, idData })  =>
    fetchAll({ endPoint, method: HttpMethod.GET, idData, token });
  //-----------------------------------------------------------------------------+
  const fetchCreate = async ({ endPoint, data })  =>
    fetchAll({ endPoint, method: HttpMethod.POST, data, token });
  //-----------------------------------------------------------------------------+
  const fetchUpdate = async ({ endPoint, idData, data })  =>
    fetchAll({ endPoint, method: HttpMethod.PATCH, idData, data, token });
  //-----------------------------------------------------------------------------+
  const fetchDelete = async ({ endPoint, idData })  =>
    fetchAll({ endPoint, method: HttpMethod.DELETE, idData, token });
  //-----------------------------------------------------------------------------+
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        users,
        setUsers,
        reservations,
        setReservations,
        login,
        logout, fetchGet, fetchCreate, fetchUpdate, fetchDelete
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
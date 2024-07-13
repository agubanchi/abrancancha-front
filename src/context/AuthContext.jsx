import React, { createContext, useContext, useState, useEffect } from "react";
import { Endpoint, fetchAll, HttpMethod } from "../services/fetchs";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

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
    const storedReservations = localStorage.getItem('reservations');
    return storedReservations ? JSON.parse(storedReservations) : [];
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || null; // Aquí no se debe usar JSON.parse ya que el token es una string.
  });

  const [typesOfCourt, setTypesOfCourt] = useState(() => {
    const storedTypesOfCourt = localStorage.getItem("typesOfCourt");
    return storedTypesOfCourt ? JSON.parse(storedTypesOfCourt) : [];
  });

  useEffect(() => {
    localStorage.setItem('typesOfCourt', JSON.stringify(typesOfCourt));
    localStorage.setItem('reservations', JSON.stringify(reservations));
    localStorage.setItem('users', JSON.stringify(users));
  }, [reservations, users, typesOfCourt]);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token); // Aquí se almacena el token como una string.
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

  const confirmReservation = (reservationId) => {
    const updatedReservations = reservations.map(res => {
      if (res.id === reservationId) {
        return { ...res, status: 'confirmada' };
      }
      return res;
    });
    setReservations(updatedReservations);
  };

  const removeReservation = (reservationId) => {
    const updatedReservations = reservations.filter(res => res.id !== reservationId);
    setReservations(updatedReservations);
  };

  const fetchGet = async ({ endPoint, idData }) =>
    fetchAll({ endPoint, method: HttpMethod.GET, idData, token });

  const fetchCreate = async ({ endPoint, data }) =>
    fetchAll({ endPoint, method: HttpMethod.POST, data, token });

  const fetchUpdate = async ({ endPoint, idData, data }) =>
    fetchAll({ endPoint, method: HttpMethod.PATCH, idData, data, token });

  const fetchDelete = async ({ endPoint, idData }) =>
    fetchAll({ endPoint, method: HttpMethod.DELETE, idData, token });

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
        logout,
        confirmReservation,
        removeReservation,
        fetchGet,
        fetchCreate,
        fetchUpdate,
        fetchDelete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

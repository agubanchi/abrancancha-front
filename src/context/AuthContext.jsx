import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [reservations, setReservations] = useState(() => {
    const storedReservations = localStorage.getItem('reservations');
    return storedReservations ? JSON.parse(storedReservations) : [];
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
    localStorage.setItem('users', JSON.stringify(users));
  }, [reservations, users]);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    setUsers(prevUsers => [...prevUsers, userData]);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const confirmReservation = (reservationId) => {
    const updatedReservations = reservations.map(res => {
      if (res.id === reservationId) {
        return { ...res, status: 'confirmada' }; // Actualiza el estado de la reserva a 'confirmada'
      }
      return res;
    });

    setReservations(updatedReservations);
  };

  const removeReservation = (reservationId) => {
    const updatedReservations = reservations.filter(res => res.id !== reservationId);
    setReservations(updatedReservations);
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, setUsers, reservations, setReservations, login, logout, confirmReservation, removeReservation }}>
      {children}
    </AuthContext.Provider>
  );
};

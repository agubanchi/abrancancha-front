import React, { createContext, useContext, useState, useEffect } from "react";
import { Endpoint, fetchAll, HttpMethod } from "../services/fetchs";
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

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : [];
  });

  const [reservations, setReservations] = useState(() => {
    const storedReservations = localStorage.getItem('reservations');
    return storedReservations ? JSON.parse(storedReservations) : [];
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
    localStorage.setItem('users', JSON.stringify(users));
  }, [reservations, users]);

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

  const confirmReservation = (reservationId) => {
<<<<<<< HEAD
    const updatedReservations = reservations.map(reservation => {
      if (reservation.id === reservationId) {
        return { ...reservation, statusOfReservation: 'Confirmada' };
      }
      return reservation;
    });
    setReservations(updatedReservations);
  };

  const cancelReservation = (reservationId) => {
    const updatedReservations = reservations.map(reservation => {
      if (reservation.id === reservationId) {
        return { ...reservation, statusOfReservation: 'Cancelada' };
      }
      return reservation;
    });
=======
    const updatedReservations = reservations.map(res => {
      if (res.id === reservationId) {
        return { ...res, status: 'confirmada' }; // Actualiza el estado de la reserva a 'confirmada'
      }
      return res;
    });

>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
    setReservations(updatedReservations);
  };

  const removeReservation = (reservationId) => {
<<<<<<< HEAD
    const updatedReservations = reservations.filter(reservation => reservation.id !== reservationId);
    setReservations(updatedReservations);
  };

  const fetchGet = async ({ endPoint, idData })  =>
  fetchAll({ endPoint, method: HttpMethod.GET, idData, token });
//-----------------------------------------------------------------------------+
const fetchCreate = async ({ endPoint, data, token }) => {
  try {
    const response = await fetchAll({ endPoint, method: HttpMethod.POST, data, token });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al procesar la solicitud');
    }
    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud de creación:', error);
    throw error;
  }
};
//-----------------------------------------------------------------------------+
const fetchUpdate = async ({ endPoint, idData, data })  =>
  fetchAll({ endPoint, method: HttpMethod.PATCH, idData, data, token });
//-----------------------------------------------------------------------------+
const fetchDelete = async ({ endPoint, idData, token }) => {
  try {
    const response = await fetchAll({ endPoint, method: HttpMethod.DELETE, idData, token });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al procesar la solicitud de eliminación');
    }
    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud de eliminación:', error);
    throw error;
  }
};



//
  return (
     <AuthContext.Provider value={{
      currentUser,
      users,
      setUsers,
      token,
      reservations,
      setReservations,
      login,
      logout,
      confirmReservation,
      cancelReservation,
      removeReservation,
      fetchGet,
      fetchCreate,
      fetchUpdate,
      fetchDelete

      
    }}>
=======
    const updatedReservations = reservations.filter(res => res.id !== reservationId);
    setReservations(updatedReservations);
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, setUsers, reservations, setReservations, login, logout, confirmReservation, removeReservation }}>
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
      {children}
    </AuthContext.Provider>
  );
};
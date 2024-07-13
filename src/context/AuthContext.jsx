import React, { createContext, useContext, useState, useEffect } from 'react';
import { Endpoint, fetchAll, HttpMethod } from '../services/fetchs';
const AuthContext = createContext();
export const Role = {
  User: 'user',
  Admin: 'admin',
  Guest: 'guest',
};
export const useAuth = () => useContext(AuthContext);
// export const useAuth = () => {
//   const { auth } = useContext(AuthContext);
//   // useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
//   return useContext(AuthContext);
// };
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

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : [];
  });

  const [reservations, setReservations] = useState(() => {
    const storedReservations = localStorage.getItem("reservations");
    return storedReservations ? JSON.parse(storedReservations) : [];
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : [];
  });
  // ################################################################
  const [typesOfCourt, setTypesOfCourt] = useState(() => {
    const storedTypesOfCourt = localStorage.getItem('typesOfCourt');
    return storedTypesOfCourt ? JSON.parse(storedTypesOfCourt) : [];
  });
  const [courts, setCourts] = useState(() => {
    const storedCourts = localStorage.getItem('Courts');
    return storedCourts ? JSON.parse(storedCourts) : [];
  });

  const getData = async (endPoint, setData) => {
    try {
      const response = await fetchGet({ endPoint: endPoint });
      if (!response.ok) {
        throw new Error('Error al cargar las canchas');
      }
      const allCanchas = await response.json();
      const courtsMap = new Map();
      allCanchas.forEach((tipo) => {
        courtsMap.set(tipo.id, tipo.name);
      });
      setData(courtsMap);
      // setCourts(courtsMap);
      // setCache(prev => ({ ...prev, tiposCancha: tiposMap }));
    } catch (error) {
      console.log(error); /* alert("ojo") */ /* err = setError(err) */
    }
  };
  // const getTiposCancha = async () => {
  //   try {
  //     const response = await fetchGet({endPoint: Endpoint.typesOfCourt});
  //     if (!response.ok) {
  //       throw new Error("Error al cargar los tipos de cancha");
  //     }
  //     const allTiposCanchas = await response.json()
  //     const tiposMap = new Map();
  //     allTiposCanchas.forEach((tipo) => { tiposMap.set(tipo.id, tipo.name) });
  //     setTypesOfCourt(tiposMap)
  //     // setCache(prev => ({ ...prev, tiposCancha: tiposMap }));
  //   } catch (error) {
  //     console.log(error)/* alert("ojo") */ /* err = setError(err) */
  //   }
  // }

  // useEffect(() => {
  //   // getData(Endpoint.courts,setCourts);
  //   // getData(Endpoint.typesOfCourt,setTypesOfCourt);
  //   // getData(Endpoint.statusOfCourt,setStatusOfCourt);
  //   // getData(Endpoint.statusOfReservation,setStatusOfReservation);
  //   // getData(Endpoint.statusOfUser,setStatusOfUser);
  //   // getData(Endpoint.timetables,setTimetables);
  //   // getData(Endpoint.schedules,setSchedules);
  //   // getData(Endpoint.exeptionTimeDate,setExeptionTimeDate);
  //   // getTiposCancha()
  // }, [])
  // ################################################################
  // const [dbHandler, setDbHandler] = useState(() => {
  //   const storedToken = localStorage.getItem('token');
  //   return storedToken ? JSON.parse(storedToken) : [];
  // });
  // const [loginUser, fetchLogin] = useState(""); //<-esta la puse yo: mario
  // const {fetchCreate} = useFetch(Endpoint.login); //<-esta la puse yo: mario

  useEffect(() => {
    localStorage.setItem('typesOfCourt', JSON.stringify(typesOfCourt)); // Guardar Reservas en el almacenamiento local
    localStorage.setItem('typesOfCourt', JSON.stringify(typesOfCourt)); // Guardar Reservas en el almacenamiento local
    localStorage.setItem('reservations', JSON.stringify(reservations));
    localStorage.setItem('users', JSON.stringify(users));
  }, [reservations, users, typesOfCourt]);
  }, [reservations, users, typesOfCourt]);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    setToken(token);
    setUsers((prevUsers) => [...prevUsers, userData]);
    setToken(token);
    setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setToken(null);
    setToken(null);
  };

  const confirmReservation = (reservationId) => {
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
    setReservations(updatedReservations);
  };

  const removeReservation = (reservationId) => {
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
      {children}
    </AuthContext.Provider>
  );
};
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
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  // const [users, setUsers] = useState(() => {
  //   const storedUsers = localStorage.getItem('users');
  //   return storedUsers ? JSON.parse(storedUsers) : [];
  // });

  const [reservations, setReservations] = useState(() => {
    const storedReservations = localStorage.getItem('reservations');
    return storedReservations ? JSON.parse(storedReservations) : [];
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken;
  });
  //-----------------------------------------------------------------------------+
  const [typesOfCourt, setTypesOfCourt] = useState(() => {
    const storedTypesOfCourt = localStorage.getItem('typesOfCourt');
    return storedTypesOfCourt ? JSON.parse(storedTypesOfCourt) : [];
  });

  const getTypesOfCourtNameById = (id) => {
    // return getNameById(id, typesOfCourt);
    const match = typesOfCourt.find((item) => item.id === id);
    return match ? match.name : 'No encontrado';
  };
  const getNameById = (id, table) => {
    const match = table.find((item) => item.id === id);
    return match ? match.name : 'No encontrado';
  };
  //-----------------------------------------------------------------------------+
  const getById = (id, array) => array.find((item) => item.id === id);
  // const getNameById = (data) => (data ? data.name : 'No encontrado');
  // const getPriceById = (data) => (data ? data.price : 'No encontrado');

  const getTariffPriceById = (id) => {
    const match = tariffs.find((item) => item.id === id);
    return match ? match.price : 'No encontrado';
  };

  const [courts, setCourts] = useState(() => {
    const storedCourts = localStorage.getItem('Courts');
    return storedCourts ? JSON.parse(storedCourts) : [];
  });

  useEffect(() => {
    const getData = async (endPoint, setData) => {
      try {
        const response = await fetchGet({ endPoint: endPoint });
        if (!response.ok) throw new Error(`Error al cargar ${endPoint}`);

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error); /* alert("ojo") */ /* err = setError(err) */
      }
    };

    getData(Endpoint.typesOfCourt, setTypesOfCourt);
    //  getData(Endpoint.tariffs,setTariffs);
  }, []);
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
    localStorage.setItem('reservations', JSON.stringify(reservations));
    // localStorage.setItem('users', JSON.stringify(users));
    // }, [reservations, users, typesOfCourt]);
  }, [reservations, typesOfCourt]);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token); // Aquí se almacena el token como una string.
    setCurrentUser(userData);
    setToken(token);
    // setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setToken(null);
  };

  const confirmReservation = (reservationId) => {
    const updatedReservations = reservations.map((res) => {
      if (res.id === reservationId) {
        return { ...res, status: 'confirmada' };
      }
      return res;
    });
    setReservations(updatedReservations);
  };

  const removeReservation = (reservationId) => {
    const updatedReservations = reservations.filter(
      (res) => res.id !== reservationId
    );
    setReservations(updatedReservations);
  };

  const getToken = () => {
    return token;
  };
  //-----------------------------------------------------------------------------+
  const fetchGet = async ({ endPoint, idData }) =>
    fetchAll({ endPoint, method: HttpMethod.GET, idData, token: getToken });
  //-----------------------------------------------------------------------------+
  const fetchCreate = async ({ endPoint, data }) =>
    await fetchAll({
      endPoint,
      method: HttpMethod.POST,
      data,
      token: getToken,
    });
  //-----------------------------------------------------------------------------+
  const fetchUpdate = async ({ endPoint, idData, data }) =>
    fetchAll({
      endPoint,
      method: HttpMethod.PATCH,
      idData,
      data,
      token: getToken,
    });
  //-----------------------------------------------------------------------------+
  const fetchDelete = async ({ endPoint, idData, token }) =>
    await fetchAll({
      endPoint,
      method: HttpMethod.DELETE,
      idData,
      token: getToken,
    });
  //-----------------------------------------------------------------------------+

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        // users,
        // setUsers,
        typesOfCourt,
        getTypesOfCourtNameById,
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

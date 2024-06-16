import { useState, useEffect } from "react";

const CONTENT_TYPE_APPLICATION_JSON = { "Content-Type": "application/json" };
// const CONTENT_TYPE_APPLICATION_JSON = {
//   "Content-Type": "application/json",
//   "Authorization": `Bearer ${tu_token_de_autorizacion}`,
// };
const BASE_URL = "http://localhost:3030";
// const BASE_URL = "API publicada: https://abrancancha-backend-type-orm.vercel.app/"; // api funcionando
export const ENDPOINTS = {
  auth: "auth",
  club: "club",
  exceptionsTimedate: "exceptionsTimedate",

  administrators: "administrators",
  users: "users",
  statusOfUser: "statusOfUser",

  courts: "courts",
  typesOfCourt: "typesOfCourt",
  timetables: "timetables",
  schedules: "schedules",
  tariffs: "tariffs",
  statusOfCourt: "statusOfCourt",

  reservations: "reservations",
  statusOfReservation: "statusOfReservation",
};

export function useFetch(url) {
  // Basic
  //   const [data, setData] = useState(url);
  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => setData(json));
  //   }, []);
  //   return { data };

  // ---------------------------------------------
  //  With Loading
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .finally(() => setLoading(false));
  //   }, []);
  //   return { data, loading };

  // ---------------------------------------------
  // With Error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        /* response.json() */
        if (response.ok) return response.json();
        throw new Error(`${response.status}. ${response.statusText}`);
      })
      .then((json) => setError("Error"))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading, error };

  // ---------------------------------------------
  // With Abort Controller
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [controller, setController] = useState(null);

  //   useEffect(() => {
  //     const abortController = new AbortController();
  //     setController(abortController);

  //     fetch(url, { signal: abortController.signal })
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .catch((error) => {
  //         if (error.name === "AbortError") {
  //           console.log("Cancelled request");
  //         } else {
  //           setError(error);
  //         }
  //       })
  //       .finally(() => setLoading(false));

  //     return () => abortController.abort();
  //   }, []);

  //   const handleCancelRequest = () => {
  //     if (controller) {
  //       controller.abort();
  //       setError("Cancelled Request");
  //     }
  //   };

  //   return { data, loading, error, handleCancelRequest };
}

export const arrayToMap = async (array) => {
  const newMap = new Map();
  array.forEach((row) => {
    newMap.set(row.id, row);
  });
  return newMap;
};

export const fetchGet = async (endPoint, arrayToMap) => {
  const res1 = await fetch(`${BASE_URL}/${endPoint}`);
  if (!res1.ok) throw new Error(`${res1.status}. ${res1.statusText}`);
  const data = await res1.json();

  return arrayToMap === undefined ? data : arrayToMap(data);
};

export const fetchCreate = async (endPoint, newData) => {
  // console.log(`${BASE_URL}/${endPoint}`,"<--------");
  const response = await fetch(`${BASE_URL}/${endPoint}`, {
    method: "POST",
    // headers: CONTENT_TYPE_APPLICATION_JSON,
    headers: {
      ...CONTENT_TYPE_APPLICATION_JSON,
      Authorization: `Bearer ${tu_token_de_autorizacion}`,
    },
    body: JSON.stringify(newData),
  });
  return response;
};
export const fetchUpdate = async (endPoint, newData, idData) => {
  const response = await fetch(`${BASE_URL}/${endPoint}/${idData}`, {
    method: "PUT",
    headers: CONTENT_TYPE_APPLICATION_JSON,
    body: JSON.stringify(newData),
  });
  return response;
};
export const fetchDelete = async (endPoint, idData) => {
  // const { user: authUser } = useAuth();
  const { user: authUser } = useAuth();
  // user.token

  const response = await fetch(`${BASE_URL}/${endPoint}/${idData}`, {
    method: "DELETE",
    Authorization: `Bearer ${token}`,
  });
  return response;
};

// const CONTENT_TYPE_APPLICATION_JSON = {
//   "Content-Type": "application/json",
//   "Authorization": `Bearer ${tu_token_de_autorizacion}`,
// }

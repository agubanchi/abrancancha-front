import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../src/context/AuthContext";

// const GET= "GET";
//mover esto a otro archivo
const FETCH_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

interface BaseProps {
  path: string;
  start: boolean;
}

type GetProps = {
  method: "GET" | "DELETE";
  // method:"GET",
  // method:"GET"|"HEAD",
  // method: (typeof FETCH_METHOD)[keyof typeof FETCH_METHOD],
  // method:GET,
  data?: never;
};

type PostProps = {
  // method:"POST"|"DELETE"|"PUT"|"PATCH",
  method: "POST" | "PUT" | "PATCH";
  data: object;
  idData?:number;
};

type ConditionalProps = GetProps | PostProps;

type Props = BaseProps & ConditionalProps;

type FetchReturn = [
  data: object | undefined,
  loading: boolean,
  refresh: () => void,
  statusCode: number
];

// function getUrl(relative:string)
// {
//     // eslint-disable-next-line
//     const urlExpression = "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)";
//     const regex = new RegExp(urlExpression);

//     if (relative.match(regex)) {
//         return relative;
//     }

//     var mainURL = process.env.REACT_APP_API_ENDPOINT;
//     if(mainURL === undefined) return "";
//     if(mainURL.charAt(mainURL.length - 1) !== "/") mainURL += "/";

//     if(relative.length > 0 && relative.charAt(0) === "/") relative = relative.substring(1, relative.length);

//     return mainURL + relative;
// }
//-----------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------
export function useFetch({ path, method, data, start }: Props): FetchReturn {
  const [result, setResult] = useState<object>();
  const [loading, setLoading] = useState(false);
  const [statusCode, setCode] = useState(-1);
  //Obtener el token del contexto
  // const { token } = useAuth();
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    // const BASE_URL = "http://localhost:3030";
    // const BASE_URL = "API publicada: https://abrancancha-backend-type-orm.vercel.app/"; // api funcionando
    
    // const staticURL = getUrl(path);
    const staticURL = "https://abrancancha-backend-type-orm.vercel.app/" + path;
// `${BASE_URL}/${endPoint}/${idData}`
    const response = await fetch(staticURL, {
      headers: data === undefined ? {} : { "Content-Type": "application/json" },
      // headers: {
      //     "Content-Type":"application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      body: JSON.stringify(data === undefined ? {} : data),
      // method:method
      method: method === undefined ? "GET" : method,
    });

    setCode(response.status);

    try {
      const text = await response.text();
      const data = JSON.parse(text);
      setResult(data);
    } catch (err) {
      setResult({});
    }

    setLoading(false);
  }, [data, loading, statusCode]);

  useEffect(() => {
    if (start) {
      fetchData();
    }
  }, [fetchData, start]);

  const refresh = () => {
    fetchData();
  };

  return [result, loading, refresh, statusCode];
}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
export function useGet({ path, start }: BaseProps): FetchReturn {
  return useFetch({ path, method: "GET", start });
}
//-----------------------------------------------------------------------------
// export function usePost({path, start, data}:BaseProps & PostProps):FetchReturn
export function useCreate({
  path,
  start,
  data,
}: BaseProps & PostProps): FetchReturn {
  const fetchResult = useFetch({ path, method: "POST", start, data });
  return fetchResult;
}
//-----------------------------------------------------------------------------
export function useUpdate({
  path,
  start,
  data,
}: BaseProps & PostProps): FetchReturn {
  const fetchResult = useFetch({ path, method: "PATCH", start, data });
  return fetchResult;
}
//-----------------------------------------------------------------------------
export function useDelete({
  path,
  start,
  data,
}: BaseProps & PostProps): FetchReturn {
  const fetchResult = useFetch({ path, method: "DELETE", start });
  return fetchResult;
}

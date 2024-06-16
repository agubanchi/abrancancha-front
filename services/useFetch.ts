import { useState, useEffect } from "react";

const FETCH_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
};

type UseFetchState<T> = {
  state: (typeof FETCH_STATE)[keyof typeof FETCH_STATE];
  // state: "idle" | "loading" | "error" | "success";
  data: null | T;
  error: null | Error;
  isLoading: () => boolean;
  isIdle: () => boolean;
  hasError: () => boolean;
};

// interface Props{
//   url:string,
//   method:"GET"|"HEAD"|"POST"|"DELETE"|"PUT",
//   start:boolean
// }
//https://medium.com/@hawaiidevold/useget-post-react-custom-hook-44357335d5be
//---------------
interface BaseProps{
  url:string,
  start:boolean
}
type GetProps = {
  method:"GET"|"HEAD",
  data?:never
}
type PostProps = {
  method:"POST"|"DELETE"|"PUT",
  data:object
}
type ConditionalProps = GetProps | PostProps
type Props = BaseProps & ConditionalProps
//-------------------------
export function useFetch3<T>(url: string) {
  const [fetchState, setFetchState] = useState<UseFetchState<T>>({
    state: FETCH_STATE.IDLE,
    data: null,
    error: null,
    isLoading() {
      return this.state === FETCH_STATE.LOADING;
    },
    isIdle() {
      return this.state === FETCH_STATE.IDLE;
    },
    hasError() {
      return this.state === FETCH_STATE.ERROR;
    },
    // url
  });

  useEffect(
    function () {
      async function fetchData() {
        try {
          setFetchState((oldValue) => ({
            ...oldValue,
            state: FETCH_STATE.LOADING,
          }));
          // const headers = data === undefined ? {} : {
          //"Autentication":"bearer token",
          //"Content-type":"application/json"};
  // const response = await fetch(staticURL, {
  //      headers,
  //      body:JSON.stringify(data === undefined ? {} : data),
  //      method
  //  });
          const response = await fetch(url);
          if (response.ok) {
            const json = await response.json();
            setFetchState((oldValue) => ({
              ...oldValue,
              data: json,
              state: FETCH_STATE.SUCCESS,
              error: null,
            }));
          } else
            setFetchState((oldValue) => ({
              ...oldValue,
              data: null,
              state: FETCH_STATE.ERROR,
              error: new Error(response.statusText),
            }));

          // throw new Error(`${response.status}. ${response.statusText}`);

          // .then((json) => setError("Error"))
          // .catch((error) => setError(error))
          // .finally(() => setLoading(false));
        } catch (error) {
          setFetchState((oldValue) => ({
            ...oldValue,
            data: null,
            state: FETCH_STATE.ERROR,
            error: error as Error,
          }));
        }
      }
      fetchData();
    },
    [url]
  );

  return fetchState;
}
//- va en un archivo tsx
interface User {
  id: string;
  name: string;
  email: string;
}
type UserApiResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

const fff = useFetch3<UserApiResponse>("algo");
if (fff.isLoading() || fff.isIdle()) {
  // return <div>Cargando...</div>;
}
if (fff.hasError() || !fff.data) {
  // return <div>Error</div>;
}
// return (<ul>{fff.data.map(algo=><li key={algo.id}>{algo.email}</li>)}</ul>)
// return (<List item={fff.data} renderItem= {(algo)=> <li key={algo.id}>{algo.email}</li>)} />)

// const BASE_API_URL="https://abrancancha-backend-type-orm.vercel.app"
const BASE_API_URL =
  "https://abrancancha-backend-type-orm-elmarito-marios-projects-4e74595b.vercel.app/api"; // api funcionando
//------------------------------------------------------------------------------
export enum Endpoint {
  // auth = "auth",
  login = "auth/login",
  register = "auth/register",
  reset = "auth/reset",

  club = "club",
  exceptionsTimedate = "exceptionsTimedate",

  administrators = "administrators",
  users = "users",
  statusOfUser = "statusOfUser",

  courts = "courts",
  typesOfCourt = "typesOfCourt",
  timetables = "timetables",
  schedules = "schedules",
  tariffs = "tariffs",
  statusOfCourt = "statusOfCourt",

  reservations = "reservations",
  statusOfReservation = "statusOfReservation",
}
//------------------------------------------------------------------------------
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type IdData = number;
type Data = any;

type UseFetchParams = {
  endPoint: Endpoint;
  baseUrl?: string;
  token?: string;
};
export interface FetchGetParams extends UseFetchParams {
  idData: IdData;
}
export interface FetchCreateParams extends UseFetchParams {
  data: Data;
}
export interface F_U_Params extends UseFetchParams {
  idData: IdData;
  data: Data;
}
export interface F_D_Params extends UseFetchParams {
  idData: IdData;
}

type GETParams = { method: HttpMethod.GET } & FetchGetParams;
type POSTParams = { method: HttpMethod.POST } & FetchCreateParams;
type PATCHParams = { method: HttpMethod.PATCH } & F_U_Params;
type DELETEParams = { method: HttpMethod.DELETE } & F_D_Params;

type FetchParams = GETParams | POSTParams | PATCHParams | DELETEParams;
//)  & {token: string};
//-----------------------------------------------------------------------------
export const fetchAll = async (params: FetchParams): Promise<Response> => {
  const data = params["data"];
  const idData = params["idData"];
  const baseUrl = params["baseUrl"] ?? BASE_API_URL;
  const staticURL = `${baseUrl}/${params.endPoint}${
    idData ? "/" + idData : ""
  }`;
  const fetchinit = {
    method: params.method,
    headers: {
      ...(data && { "Content-Type": "application/json" }),
      ...(params.token && { Authorization: `Bearer ${params.token}` }),
    },
    // body: JSON.stringify(data === undefined ? {} : data),
    ...(data && { body: JSON.stringify(data) }),
  };
  return await fetch(staticURL, fetchinit);
};

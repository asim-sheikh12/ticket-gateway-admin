import { ApiVersions, HttpMethods } from '@/constants';
import type { IEndpointProvider, IMethod, Request } from '@/interfaces';

export const queryOf = (params: Record<string, string> = {}): string => {
  return new URLSearchParams(params).toString();
};

const callApi = async <T, K>(
  method: IMethod,
  url: string,
  payload: K | null,
  _req: Request | null,
  base: IEndpointProvider,
): Promise<T> => {
  let baseURL: string = '';
  switch (base) {
    case ApiVersions.V1:
      baseURL = process.env.NEXT_PUBLIC_API_URL!;
      break;
    case ApiVersions.MOCK:
      baseURL = process.env.NEXT_PUBLIC_MOCK_API!;
      break;
    default:
      break;
  }
  const api: string = `${baseURL}${url}`;
  const headers: { [x: string]: string } = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method: method || HttpMethods.GET,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  if (
    [HttpMethods.POST, HttpMethods.PUT, HttpMethods.PATCH].includes(
      method as HttpMethods,
    )
  ) {
    options.body = JSON.stringify(payload ?? {});
  }

  const response: Response = await fetch(api, options);
  if (!response?.ok) {
    throw new Error(response?.statusText);
  }
  return response.json();
};

export const apiService = {
  get: <T, K = {}>(
    url: string,
    req?: Request,
    base: IEndpointProvider = ApiVersions.V1,
  ) => callApi<T, K>(HttpMethods.GET, url, null, req ?? null, base),
  post: <T, K>(
    url: string,
    payload: K,
    req?: Request,
    base: IEndpointProvider = ApiVersions.V1,
  ) => callApi<T, K>(HttpMethods.POST, url, payload, req ?? null, base),
  patch: <T, K = Record<string, string | number>>(
    url: string,
    payload: K,
    req?: Request,
    base: IEndpointProvider = ApiVersions.V1,
  ) => callApi<T, K>(HttpMethods.PATCH, url, payload, req ?? null, base),
  put: <T, K = Record<string, string | number>>(
    url: string,
    payload: K,
    req?: Request,
    base: IEndpointProvider = ApiVersions.V1,
  ) => callApi<T, K>(HttpMethods.PUT, url, payload, req ?? null, base),
  delete: <T, K = {}>(
    url: string,
    req?: Request,
    base: IEndpointProvider = ApiVersions.V1,
  ) => callApi<T, K>(HttpMethods.DELETE, url, null, req ?? null, base),
};

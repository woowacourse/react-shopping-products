import { generateBasicToken } from '../utils/auth';
import { Interceptor } from './Interceptor';

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
export const token = generateBasicToken(USER_ID, USER_PASSWORD);

export class ApiClient {
  private headers: HeadersInit = {};
  interceptor: Interceptor = new Interceptor(
    (request) => request,
    (error) => error,
  );

  constructor(headers?: HeadersInit) {
    if (!headers) return;
    this.headers = headers;
  }

  setHeaders(headers: HeadersInit) {
    this.headers = headers;
  }

  setInterceptor(interceptor: Interceptor) {
    this.interceptor = interceptor;
  }

  async get<R, T = object>(url: string, body?: T) {
    return (await this.fetch<T>('GET', url, body)).json() as R;
  }
  async post<T = object>(url: string, body?: T) {
    return await this.fetch<T>('POST', url, body);
  }
  async delete<T = object>(url: string, body?: T) {
    return await this.fetch<T>('DELETE', url, body);
  }
  async patch<T = object>(url: string, body?: T) {
    return await this.fetch<T>('PATCH', url, body);
  }

  private async fetch<T = object>(method: 'GET' | 'POST' | 'DELETE' | 'PATCH', url: string, requestBody?: T) {
    const requestInit: RequestInit = {
      method,
      headers: this.headers,
      body: JSON.stringify(requestBody),
    };
    const interceptedRequest = this.interceptor.onRequest({ ...requestInit, url });
    const response = await fetch(interceptedRequest.url, interceptedRequest);

    if (!response.ok) {
      const errorText = await response.text();
      const responseError = new ResponseError(`HTTP 응답 코드 에러 status: ${response.status} ${errorText}`, response.status);
      const interceptedError = this.interceptor.onError(responseError);
      throw interceptedError;
    }
    return response;
  }
}

export class ResponseError extends Error {
  status;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

import { generateBasicToken } from '../utils/auth';
import { ENDPOINTS_CART } from './endpoints';

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
export const token = generateBasicToken(USER_ID, USER_PASSWORD);

export class ApiClient {
  private headers: HeadersInit = {};

  constructor(headers?: HeadersInit) {
    if (!headers) return;
    this.headers = headers;
  }

  setHeaders(headers: HeadersInit) {
    this.headers = headers;
  }

  async get<R, T = object>(url: string, body?: T) {
    return await this.fetch<R, T>('GET', url, body);
  }
  async post<R, T = object>(url: string, body?: T) {
    return await this.fetch<R, T>('POST', url, body);
  }
  async delete<R, T = object>(url: string, body?: T) {
    return await this.fetch<R, T>('DELETE', url, body);
  }

  private async fetch<R, T = object>(
    method: 'GET' | 'POST' | 'DELETE',
    url: string,
    requestBody?: T,
  ) {
    const requestInit: RequestInit = {
      method,
      headers: this.headers,
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(url, requestInit);

    if (!response.ok) {
      throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
    }
    return (await response.json()) as R;
  }
}

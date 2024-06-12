import { generateBasicToken } from '../utils/auth';

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

    const response = await fetch(url, requestInit);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP 응답 코드 에러 status: ${response.status} ${errorText}`);
    }
    return await response;
  }
}

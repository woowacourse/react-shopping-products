import { BASE_URL } from '@constants/baseUrl';
import HTTPError from '@errors/HTTPError';

export default class APIClient {
  private static API_URL = BASE_URL;

  static validateResponse(response: Response, errorMessage: string) {
    if (!response.ok) {
      throw new HTTPError(response.status, errorMessage);
    }
  }

  static get(endpoint: string, headers: Record<string, string> = {}) {
    return this.request('GET', endpoint, null, headers);
  }

  static post<T extends Record<string, unknown>>(
    endpoint: string,
    body: T,
    headers: Record<string, string> = {}
  ) {
    return this.request<T>('POST', endpoint, body, headers);
  }

  static patch<T extends Record<string, unknown>>(
    endpoint: string,
    body: T,
    headers: Record<string, string> = {}
  ) {
    return this.request<T>('PATCH', endpoint, body, headers);
  }

  static delete(endpoint: string, headers: Record<string, string> = {}) {
    return this.request('DELETE', endpoint, null, headers);
  }

  static async request<T>(
    method: 'GET' | 'DELETE' | 'PATCH' | 'POST',
    endpoint: string,
    body: T | null,
    headers: Record<string, string> = {}
  ): Promise<Response> {
    const url = `${this.API_URL}/${endpoint}`;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    return response;
  }
}

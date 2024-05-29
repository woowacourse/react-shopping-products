import { generateBasicToken } from '../utils/auth';

export const API_URL = import.meta.env.VITE_API_URL;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface ApiProps {
  endpoint: string;
  headers?: Record<string, string>;
  body?: object | null;
  errorMessage?: string;
}

interface RequestProps extends ApiProps {
  method: Method;
}

const apiClient = {
  get({ endpoint, headers = {}, errorMessage = '' }: ApiProps) {
    return this.request({ method: 'GET', endpoint, headers, errorMessage });
  },
  post({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) {
    return this.request({ method: 'POST', endpoint, headers, body, errorMessage });
  },
  patch({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) {
    return this.request({ method: 'PATCH', endpoint, headers, body, errorMessage });
  },
  delete({ endpoint, headers = {}, errorMessage = '' }: ApiProps) {
    return this.request({ method: 'DELETE', endpoint, headers, errorMessage });
  },

  request({ method, endpoint, headers = {}, body = null, errorMessage = '' }: RequestProps) {
    const token = generateBasicToken(USER_ID, USER_PASSWORD);

    const requestInit = {
      method,
      headers: { ...headers, Authorization: token, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    };

    return this.fetchWithErrorHandling(endpoint, requestInit, errorMessage);
  },

  async fetchWithErrorHandling(endpoint: string, requestInit: RequestInit, errorMessage: string) {
    const response = await fetch(`${API_URL}${endpoint}`, requestInit);

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    const text = await response.text();

    if (text === '') return;

    const data = await JSON.parse(text);

    return data;
  },
};

export default apiClient;

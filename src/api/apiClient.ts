import { generateBasicToken } from '../utils/auth';

export const API_URL = import.meta.env.VITE_API_URL;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface ApiProps {
  endpoint: string;
  headers?: Record<string, string>;
  body?: object | null;
}

interface RequestProps extends ApiProps {
  method: Method;
}

const apiClient = {
  get({ endpoint, headers = {} }: ApiProps) {
    return this.request({ method: 'GET', endpoint, headers });
  },
  post({ endpoint, headers = {}, body = {} }: ApiProps) {
    return this.request({ method: 'POST', endpoint, headers, body });
  },
  patch({ endpoint, headers = {}, body = {} }: ApiProps) {
    return this.request({ method: 'PATCH', endpoint, headers, body });
  },
  delete({ endpoint, headers = {} }: ApiProps) {
    return this.request({ method: 'DELETE', endpoint, headers });
  },

  request({ method, endpoint, headers = {}, body = null }: RequestProps) {
    const token = generateBasicToken(USER_ID, USER_PASSWORD);

    const requestInit = {
      method,
      headers: { ...headers, Authorization: token, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    };

    return this.fetchWithErrorHandling(endpoint, requestInit);
  },

  async fetchWithErrorHandling(endpoint: string, requestInit: RequestInit) {
    const response = await fetch(`${API_URL}${endpoint}`, requestInit);

    if (!response.ok) {
      throw new Error();
    }

    const text = await response.text();

    if (text === '') return;

    const data = await JSON.parse(text);

    return data;
  },
};

export default apiClient;

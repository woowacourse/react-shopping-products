import { generateBasicToken } from '../utils/auth';
import { API_URL } from '../constants/api';

const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface ApiParams {
  endpoint: string;
  headers?: Record<string, string>;
  body?: object | null;
  errorMessage?: string;
}

interface RequestParams extends ApiParams {
  method: Method;
}

const createRequestInit = (method: Method, headers: Record<string, string>, body: object | null): RequestInit => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  return {
    method,
    headers: { ...headers, Authorization: token, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null,
  };
};

const fetchWithErrorHandling = async (endpoint: string, requestInit: RequestInit, errorMessage: string = '') => {
  const response = await fetch(`${API_URL}${endpoint}`, requestInit);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  const text = await response.text();

  return text ? JSON.parse(text) : response;
};

const apiClient = {
  get: ({ endpoint, headers = {}, errorMessage = '' }: ApiParams) => {
    return apiClient.request({ method: 'GET', endpoint, headers, errorMessage });
  },
  post: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiParams) => {
    return apiClient.request({ method: 'POST', endpoint, headers, body, errorMessage });
  },
  patch: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiParams) => {
    return apiClient.request({ method: 'PATCH', endpoint, headers, body, errorMessage });
  },
  delete: ({ endpoint, headers = {}, errorMessage = '' }: ApiParams) => {
    return apiClient.request({ method: 'DELETE', endpoint, headers, errorMessage });
  },
  request: async ({ method, endpoint, headers = {}, body = null, errorMessage = '' }: RequestParams) => {
    const requestInit = createRequestInit(method, headers, body);
    return await fetchWithErrorHandling(endpoint, requestInit, errorMessage);
  },
};

export default apiClient;

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

interface ApiRequestParams<T> {
  endpoint: string;
  method?: HttpMethod;
  body?: T;
}

const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const baseUrl = import.meta.env.VITE_BASE_URL;
const credentials = btoa(`${username}:${password}`);

const headers: HeadersInit = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${credentials}`,
};

async function apiRequestWithAuth<TRequest, TResponse = void>({
  endpoint,
  method = 'GET',
  body,
}: ApiRequestParams<TRequest>): Promise<TResponse> {
  const options: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType !== 'application/json') return {} as TResponse;

  const data = await response.json();
  return data;
}

export default apiRequestWithAuth;

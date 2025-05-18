import { FETCH_ERROR_MESSAGE, DEFAULT_ERROR_MESSAGE } from '../constants/errorMessages';
import { FetchMethodType } from '../types/data';

interface ApiClientProps<RequestBody> {
  method: FetchMethodType;
  URI: string;
  body?: RequestBody;
}

interface ApiClientType {
  <Response, RequestBody>(
    options: Omit<ApiClientProps<RequestBody>, 'method'> & {
      method: 'DELETE' | 'POST';
      body?: RequestBody;
    },
  ): Promise<Response>;

  <Response>(
    options: Omit<ApiClientProps<Response>, 'method'> & { method: 'GET' },
  ): Promise<Response>;
}

const apiClient: ApiClientType = async <Response, RequestBody>({
  method,
  URI,
  body,
}: ApiClientProps<RequestBody>): Promise<Response | void> => {
  const basicToken = btoa(
    `${import.meta.env.VITE_API_USERNAME}:${import.meta.env.VITE_API_PASSWORD}`,
  );
  const requestURL = `${import.meta.env.VITE_API_BASE_URL}` + URI;
  const response = await fetch(requestURL, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-type': 'application/json', Authorization: `Basic ${basicToken}` },
  });

  if (response.status === 204) {
    return;
  }

  if (response.ok) {
    if (response.headers.get('content-length') === '0') return;
    return response.json();
  }

  if (response.status in FETCH_ERROR_MESSAGE) {
    throw new Error(FETCH_ERROR_MESSAGE[String(response.status)]);
  }

  throw new Error(DEFAULT_ERROR_MESSAGE);
};

export default apiClient;

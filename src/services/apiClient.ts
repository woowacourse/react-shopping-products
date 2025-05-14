import { FETCH_ERROR_MESSAGE, DEFAULT_ERROR_MESSAGE } from '../constants/systemConstants';

interface ApiClientProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  URI: string;
  body?: any;
}

const apiClient = async ({ method, URI, body }: ApiClientProps) => {
  const basicToken = btoa(
    `${import.meta.env.VITE_API_USERNAME}:${import.meta.env.VITE_API_PASSWORD}`,
  );
  const requestURL = `${import.meta.env.VITE_API_BASE_URL}` + URI;
  const response = await fetch(requestURL, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-type': 'application/json', Authorization: `Basic ${basicToken}` },
  });

  console.log(response);

  if (response.ok) {
    return response.json();
  }

  if (response.status in FETCH_ERROR_MESSAGE) {
    throw new Error(FETCH_ERROR_MESSAGE[String(response.status)]);
  }

  throw new Error(DEFAULT_ERROR_MESSAGE);
};

export default apiClient;

import { API_URL, USER_ID, USER_PASSWORD } from '@/api/config';

import { generateBasicToken } from '@/utils/auth';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error, status: ${response.status}, message: ${errorText}`
    );
  }
  return response;
};

const fetchFromAPI = async (endpoint: string, options: RequestInit) => {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  return handleResponse(response);
};

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const headersWithAuth = {
    ...options.headers,
    Authorization: token,
  };
  return fetchFromAPI(endpoint, { ...options, headers: headersWithAuth });
};

export const fetchWithoutAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  return fetchFromAPI(endpoint, options);
};

import { API_URL, USER_ID, USER_PASSWORD } from '@/api/config';

import { generateBasicToken } from '@/utils/auth';

const fetchFromAPI = async (endpoint: string, options: RequestInit) => {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  return response;
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

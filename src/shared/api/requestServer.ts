/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_CONFIG } from '../config/api';
import { apiError } from '../lib/apiError';

const generateBasicToken = (userId: string, userPassword: string) => {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
};

interface requestServerProps {
  method: string;
  path: string;
  query?: string;
  bodyData?: Record<string, any>;
}

export const requestServer = async <T = void>({ method, path, query, bodyData }: requestServerProps): Promise<T> => {
  const token = generateBasicToken(API_CONFIG.userId, API_CONFIG.userPassword);
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  };

  const url = new URL(query ? `${path}?${query}` : path, API_CONFIG.domain);
  const options: RequestInit = { method, headers, ...(bodyData && { body: JSON.stringify(bodyData) }) };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw apiError({
      status: response.status,
      message: await response.text(),
    });
  }

  return method === 'GET' ? response.json() : null;
};

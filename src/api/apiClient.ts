import { API_ERROR_MESSAGES, DEFAULT_ERROR_MESSAGE } from './constants/errorMessages';
import { ApiConfigType } from './types';

export const apiClient = async <T, P>(apiConfigs: ApiConfigType, query: string, params?: P): Promise<T> => {
  const newParams = new URLSearchParams(params as Record<string, string>);
  const newUrl = `${import.meta.env.VITE_BASE_URL}${query}?${newParams.toString()}`;
  const options = {
    method: apiConfigs.method,
    headers: {
      'Content-Type': 'application/json',
      ...(apiConfigs.isAuthorization && { Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}` }),
    },
    ...(apiConfigs.body && { body: JSON.stringify(apiConfigs.body) }),
  };

  const response = await fetch(newUrl, options);
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || API_ERROR_MESSAGES[response.status] || DEFAULT_ERROR_MESSAGE);
  }

  if (response.headers.get('Content-Type')?.includes('application/json')) {
    return response.json();
  }

  return response as T;
};

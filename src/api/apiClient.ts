import { API_ERROR_MESSAGES, DEFAULT_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE } from './constants/errorMessages';
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

  try {
    const response = await fetch(newUrl, options);
    if (!response.ok) {
      throw new Error(API_ERROR_MESSAGES[response.status] ?? DEFAULT_ERROR_MESSAGE);
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const data = await response.json();
      return data.content;
    }

    return response as T;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error(NETWORK_ERROR_MESSAGE);
    }

    throw new Error(`${DEFAULT_ERROR_MESSAGE}`);
  }
};

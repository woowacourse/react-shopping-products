import { ERROR_MESSAGE } from '../constants/apis';
import { HTTPMethod } from '../types/apis';

export async function fetchClient(url: string, method: HTTPMethod, token?: string) {
  try {
    const headers = getHeaders(token);
    const response = await fetch(url, {
      method,
      headers,
    });

    if (!response.ok) {
      throw new Error(getResponseErrorMessage(response.status));
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

function getHeaders(token?: string): Record<string, string> {
  const headers = { 'Content-type': 'application/json' };
  if (token) {
    return { ...headers, Authorization: token };
  }
  return headers;
}

function getResponseErrorMessage(status: number, defaultErrorMessage?: string): string {
  if (status >= 500) {
    return ERROR_MESSAGE.SERVER_ERROR;
  }
  if (status === 401 || status === 403) {
    return ERROR_MESSAGE.AUTHENTICATION_FAILED;
  }
  if (status >= 400) {
    return defaultErrorMessage ?? ERROR_MESSAGE.FETCHING_FAILED;
  }
  return ERROR_MESSAGE.UNKNOWN_ERROR;
}

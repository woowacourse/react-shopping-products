// request.ts
import { HttpError } from './httpError';
import type { RequestOptions } from './types';

export const request = async <T>({
  baseUrl,
  token,
  method,
  query,
  body,
  returnOriginalOnNoContent,
}: RequestOptions<T>): Promise<T> => {
  const url = new URL(baseUrl);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value)) {
      url.searchParams.append(key, String(value));
    }
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${token}`,
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && ['POST', 'PATCH'].includes(method)) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new HttpError(response.status, errorData);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    if (returnOriginalOnNoContent && body) {
      return body as unknown as T;
    }
    return undefined as unknown as T;
  }

  return await response.json();
};

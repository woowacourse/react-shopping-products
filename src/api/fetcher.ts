import { HttpError } from './httpError';

type FetcherOptions<T> = {
  baseUrl: string;
  token: string;
  query?: object;
  body?: T;
};

type FetcherResponse<T> = Promise<T>;

export const fetcher = {
  get: async <T>({ baseUrl, token, query = {} }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      baseUrl,
      token,
      query,
      method: 'GET',
    });
  },
  post: async <T>({ baseUrl, token, body }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      baseUrl,
      token,
      body,
      method: 'POST',

      returnOriginalOnNoContent: true,
    });
  },
  patch: async <T>({ baseUrl, token, body }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      baseUrl,
      token,
      body,
      method: 'PATCH',
      returnOriginalOnNoContent: true,
    });
  },
  delete: async <T>({ baseUrl, token }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      baseUrl,
      token,
      method: 'DELETE',
      returnOriginalOnNoContent: true,
    });
  },
};

type RequestOptions<T> = {
  baseUrl: string;
  token: string;
  method: string;
  query?: object;
  body?: T;
  returnOriginalOnNoContent?: boolean;
};

const request = async <T>({
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
    throw new HttpError(response.status);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    if (returnOriginalOnNoContent && body) {
      return body as unknown as T;
    }
    return returnOriginalOnNoContent as unknown as T;
  }

  return await response.json();
};

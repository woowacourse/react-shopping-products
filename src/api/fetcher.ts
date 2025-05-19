import { ENV } from './env';
import { HttpError } from './httpError';

const baseUrl = ENV.BASE_URL;
const token = ENV.TOKEN;

type FetcherOptions<T> = {
  endpoint: string;
  query?: object;
  body?: T;
};

type FetcherResponse<T> = Promise<T>;

export const fetcher = {
  get: async <T>({ endpoint, query = {} }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      fullUrl: `${baseUrl}${endpoint}`,
      token,
      query,
      method: 'GET',
    });
  },
  post: async <T>({ endpoint, body }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      fullUrl: `${baseUrl}${endpoint}`,
      token,
      body,
      method: 'POST',

      returnOriginalOnNoContent: true,
    });
  },
  delete: async <T>({ endpoint }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      fullUrl: `${baseUrl}${endpoint}`,
      token,
      method: 'DELETE',
      returnOriginalOnNoContent: true,
    });
  },
};

type RequestOptions<T> = {
  fullUrl: string;
  token: string;
  method: string;
  query?: object;
  body?: T;
  returnOriginalOnNoContent?: boolean;
};

const request = async <T>({
  fullUrl,
  token,
  method,
  query,
  body,
  returnOriginalOnNoContent,
}: RequestOptions<T>): Promise<T> => {
  const url = new URL(fullUrl);
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

  if (body && method === 'POST') {
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

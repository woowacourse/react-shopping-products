import { ENV } from './env';
import { HttpError } from './httpError';

const baseUrl = ENV.BASE_URL;
const token = ENV.ACCESS_TOKEN;

type FetcherOptions<T> = {
  endpoint: string;
  query?: object;
  body?: T;
  returnOriginalOnNoContent?: boolean;
};

type FetcherResponse<T> = Promise<T>;

const createRequestConfig = <T>({
  method,
  token,
  body,
}: {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  token: string;
  body?: T;
}): RequestInit => {
  const headers: Record<string, string> = {
    Authorization: `Basic ${token}`,
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(body);
  }

  return config;
};

export const fetcher = {
  get: async <T>({ endpoint, query = {} }: FetcherOptions<T>): FetcherResponse<T> => {
    const url = new URL(`${baseUrl}${endpoint}`);
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value)) {
        url.searchParams.append(key, String(value));
      }
    });

    const config = createRequestConfig({ method: 'GET', token });
    return request<T>({ url: url.toString(), config });
  },

  post: async <T>({ endpoint, body }: FetcherOptions<T>): FetcherResponse<T> => {
    const url = `${baseUrl}${endpoint}`;
    const config = createRequestConfig({ method: 'POST', body, token });
    return request<T>({ url, config });
  },

  patch: async <T>({ endpoint, body }: FetcherOptions<T>): FetcherResponse<T> => {
    const url = `${baseUrl}${endpoint}`;
    const config = createRequestConfig({ method: 'PATCH', body, token });
    return request<T>({ url, config });
  },

  delete: async <T>({
    endpoint,
    body,
    returnOriginalOnNoContent,
  }: FetcherOptions<T>): FetcherResponse<T> => {
    const url = `${baseUrl}${endpoint}`;
    const config = createRequestConfig({ method: 'DELETE', body, token });

    return request<T>({
      url,
      config,
      returnOriginalOnNoContent,
      originalBody: body,
    });
  },
};

type RequestOptions<T> = {
  url: string;
  config: RequestInit;
  returnOriginalOnNoContent?: boolean;
  originalBody?: T;
};

export const request = async <T>({
  url,
  config,
  returnOriginalOnNoContent,
  originalBody,
}: RequestOptions<T>): Promise<T> => {
  const response = await fetch(url, config);

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    if (returnOriginalOnNoContent && originalBody) {
      return originalBody as T;
    }
    return returnOriginalOnNoContent as unknown as T;
  }

  return await response.json();
};

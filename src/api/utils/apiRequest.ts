import ApiError from './apiError';

type RequestOptions = RequestInit & {
  queryParams?: Record<string, string | number | undefined>;
};

const apiRequest = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { queryParams, headers, ...restOptions } = options;

  const requestUrl = new URL(url);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        requestUrl.searchParams.append(key, String(value));
      }
    });
  }

  const username = import.meta.env.VITE_API_USERNAME;
  const password = import.meta.env.VITE_API_PASSWORD;
  const base64Credentials = btoa(`${username}:${password}`);

  const response = await fetch(requestUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
      ...headers,
    },
    ...restOptions,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(response.status, response.statusText, errorText);
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null as T;
};

export default apiRequest;

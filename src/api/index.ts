const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

const getHeaders = (options: ApiOptions) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${API_KEY}`,
    ...options.headers,
  };
};

const getBody = (options: ApiOptions) => {
  return options.body ? JSON.stringify(options.body) : undefined;
};

const getMethod = (options: ApiOptions) => {
  return options.method ?? 'GET';
};

const createErrorMessage = (status: number, statusText: string): string => {
  if (status === 401) {
    return '인증에 실패했습니다. 다시 시도해주세요.';
  } else if (status === 404) {
    return '요청한 페이지(데이터)를 찾을 수 없습니다.';
  } else if (status === 500) {
    return '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  } else {
    return statusText;
  }
};

const handleResponse = async <T>(
  response: Response,
  method?: string
): Promise<T> => {
  if (!response.ok) {
    const errorMessage = createErrorMessage(
      response.status,
      response.statusText
    );
    throw new Error(errorMessage);
  }

  if (method === 'DELETE') {
    return {} as T;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return {} as T;
};

const createRequestConfig = (options: ApiOptions) => {
  return {
    method: getMethod(options),
    headers: getHeaders(options),
    body: getBody(options),
  };
};

const handleApiError = (error: unknown) => {
  console.error('API 요청 중 오류 발생:', error);
  if (error instanceof Error) {
    throw new Error(`API 요청 오류: ${error.message}`);
  }
  throw new Error('API 요청 오류');
};

export const apiRequest = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const config = createRequestConfig(options);

  try {
    const response = await fetch(url, config);
    return await handleResponse<T>(response, options.method);
  } catch (error) {
    return handleApiError(error);
  }
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export const apiRequest = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    validateResponse(response);

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return response as T;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    if (error instanceof Error) {
      throw new Error(`API 요청 오류: ${error.message}`);
    }

    throw new Error('API 요청 오류');
  }
};

const validateResponse = (response: Response) => {
  if (!response.ok) {
    let errorMessage: string;

    if (response.status === 401) {
      errorMessage = '인증에 실패했습니다. 다시 시도해주세요.';
    } else if (response.status === 404) {
      errorMessage = '요청한 페이지(데이터)를 찾을 수 없습니다.';
    } else if (response.status === 500) {
      errorMessage = '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    } else {
      errorMessage = response.statusText;
    }

    throw new Error(errorMessage);
  }
};

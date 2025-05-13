interface ApiClientProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  URI: string;
  body?: any;
}

const DEFAULT_ERROR_MESSAGE = '저런! 예기치 못한 문제가 발생했어요!';

const FETCH_ERROR_MESSAGE: Record<string, string> = {
  400: '잘못된 요청입니다. 다시 시도해주세요.',
  404: '요청하신 페이지를 찾을 수 없습니다. 다시 시도해주세요.',
  500: '서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.',
} as const;

const apiClient = async ({ method, URI, body }: ApiClientProps) => {
  const requestURL = `${import.meta.env.VITE_API_BASE_URL}` + URI;
  const response = await fetch(requestURL, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-type': 'application/json' },
  });

  if (response.ok) {
    return response.json();
  }

  if (response.status in FETCH_ERROR_MESSAGE) {
    throw new Error(FETCH_ERROR_MESSAGE[String(response.status)]);
  }

  throw new Error(DEFAULT_ERROR_MESSAGE);
};

export default apiClient;

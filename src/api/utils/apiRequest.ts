type RequestOptions = RequestInit & {
  queryParams?: Record<string, string | number | undefined>;
};

const apiClient = async <T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { queryParams, headers, ...restOptions } = options;

  const requestUrl = new URL(url);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        requestUrl.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...restOptions,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API 요청 실패: ${response.status} ${errorText}`);
  }

  return response.json();
};

export default apiClient;

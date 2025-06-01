export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export function createApiClient({ baseUrl, headers = {} }: ApiClientConfig) {
  async function request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      headers,
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "API 요청 중 에러가 발생했습니다.");
    }
    return data as T;
  }

  return {
    get: <T>(path: string): Promise<T> => request<T>(path),

    post: <T = unknown, B = unknown>(path: string, body: B): Promise<T> =>
      request<T>(path, {
        method: "POST",
        body: JSON.stringify(body),
      }),

    patch: <T = unknown, B = unknown>(path: string, body: B): Promise<T> =>
      request<T>(path, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),

    delete: <T = unknown>(path: string): Promise<T> =>
      request<T>(path, {
        method: "DELETE",
      }),
  };
}

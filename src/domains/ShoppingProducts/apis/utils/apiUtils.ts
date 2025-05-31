type optionMethod = "GET" | "POST" | "DELETE" | "PATCH";

export const getRequestOptions = (
  method: optionMethod,
  body?: Record<string, number>,
  withAuth?: boolean
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (withAuth)
    headers["Authorization"] = `Basic ${import.meta.env.VITE_USER_TOKEN}==`;

  const options: RequestInit = {
    method,
    headers,
  };
  if (body) options.body = JSON.stringify(body);

  return options;
};

export const tryFetch = async (fetchFunction: () => Promise<Response>) => {
  try {
    const response = await fetchFunction();
    if (!response.ok) {
      throw new Error(`API 통신 실패: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("`API 통신 중 오류 발생:", error);
    throw error;
  }
};

export const apiClient = {
  get: (url: string, withAuth = true) =>
    tryFetch(() =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}${url}`,
        getRequestOptions("GET", undefined, withAuth)
      )
    ),
  post: (url: string, body: Record<string, number>, withAuth = true) =>
    tryFetch(() =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}${url}`,
        getRequestOptions("POST", body, withAuth)
      )
    ),
  delete: (url: string, withAuth = true) =>
    tryFetch(() =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}${url}`,
        getRequestOptions("DELETE", undefined, withAuth)
      )
    ),
  patch: (url: string, body: Record<string, number>, withAuth = true) =>
    tryFetch(() =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}${url}`,
        getRequestOptions("PATCH", body, withAuth)
      )
    ),
};

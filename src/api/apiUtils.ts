type optionMethod = "GET" | "POST" | "DELETE";

export const getRequestOptions = ({
  method,
  withAuth = false,
  body,
}: {
  method: optionMethod;
  withAuth?: boolean;
  body?: Record<string, number>;
}) => {
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

export const tryFetch = async ({
  fetchFunction,
}: {
  fetchFunction: () => Promise<Response>;
}) => {
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

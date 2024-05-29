const generateBasicToken = (userId: string, userPassword: string): string => {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
};

const API_URL = `${import.meta.env.VITE_API_URL}`;
const USER_ID = `${import.meta.env.VITE_USER_ID}`;
const USER_PASSWORD = `${import.meta.env.VITE_USER_PASSWORD}`;

if (!API_URL || !USER_ID || !USER_PASSWORD) {
  throw new Error(
    "API_URL, USER_ID, PASSWORD environment variables are not set"
  );
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
  method: HttpMethod;
  body?: Record<string, unknown>;
}

export const fetchWithAuth = async (path: string, options: RequestOptions) => {
  const requestInit = requestBuilder(options);
  const response = await fetch(path, requestInit);

  if (!response.ok) {
    throw new Error(`Failed to ${options.method} ${path}`);
  }

  return response;
};

const requestBuilder = (options: RequestOptions): RequestInit => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const { method, body } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
};

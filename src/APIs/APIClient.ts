import { credentials } from "./apiConfig";

export type Method = "GET" | "POST" | "DELETE";

export async function apiClient<T>(
  method: Method,
  url: string,
  requestBody?: unknown
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    ...(requestBody ? { body: JSON.stringify(requestBody) } : {}),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

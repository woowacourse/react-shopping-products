import { generateBasicToken } from "@/utils/auth";
import { USERNAME, PASSWORD, API_URL } from "@/constants/api";

interface FetchAPI {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  body?: Record<string, unknown>;
}

export const fetchAPI = async <T>({ url, method, body }: FetchAPI): Promise<T | void> => {
  const token = generateBasicToken(USERNAME, PASSWORD);
  const response = await fetch(`${API_URL}/${url}`, {
    method,
    headers: { Authorization: token, "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to patch cart item quantity");
  }

  if (method === "GET") {
    const data = await response.json();
    return data;
  }
};

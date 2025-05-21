import { credentials } from "./apiConfig";

type Method = "GET" | "POST" | "DELETE";

export async function apiClient<T>(
  method: Method,
  url: string,
  requestBody?: unknown
): Promise<T | null> {
  try {
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

    if (method === "GET") return await response.json();

    return null;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

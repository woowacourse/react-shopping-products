interface requestProps<T extends object> {
  headers?: Record<string, string>;
  method: "GET" | "POST" | "DELETE" | "PATCH";
  url: string;
  body?: T;
}

async function request<T extends object>({
  method,
  url,
  body,
}: requestProps<T>) {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: import.meta.env.VITE_TOKEN,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error();

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return null;
}

export default request;

interface requestProps<T extends object> {
  method: "GET" | "POST" | "DELETE" | "PATCH";
  url: string;
  body?: T;
}

async function request<T extends object>({
  method,
  url,
  body,
}: requestProps<T>) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
}

export default request;

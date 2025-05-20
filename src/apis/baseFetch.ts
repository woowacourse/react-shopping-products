const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const baseFetch = async <T>(url: string, options?: RequestInit, parseJson: boolean = true): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
    ...options,
  });

  if (!response.ok) throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");

  return parseJson ? response.json() : (undefined as T);
};

export default baseFetch;

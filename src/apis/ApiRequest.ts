type ApiRequestGetType = {
  endpoint: string;
  searchParams: Record<string, string>;
  useToken?: boolean;
};

type ApiRequestPostType = {
  endpoint: string;
  searchParams: Record<string, string>;
  useToken?: boolean;
};

class ApiRequest {
  #baseUrl: string;
  #token: string;

  constructor(baseUrl: string, token: string) {
    this.#baseUrl = baseUrl;
    this.#token = token;
  }

  async GET<T>({
    endpoint,
    searchParams,
    useToken = false,
  }: ApiRequestGetType): Promise<T> {
    const url = new URL(`${this.#baseUrl}${endpoint}`);
    url.search = new URLSearchParams(searchParams).toString();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...(useToken && { Authorization: `Basic ${this.#token}` }),
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("GET 에러 발생!");
    }

    return response.json();
  }

  async POST({ endpoint, searchParams, useToken = true }: ApiRequestPostType) {
    const url = new URL(`${this.#baseUrl}${endpoint}`);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(useToken && { Authorization: `Basic ${this.#token}` }),
      },
      body: JSON.stringify(searchParams),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("상품이 이미 존재합니다.");
    }
  }
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export const apiRequest = new ApiRequest(BASE_URL, TOKEN);

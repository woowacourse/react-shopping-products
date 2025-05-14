class HTTPClient {
  baseUrl = "";
  apiKey = "";

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey || "";
  }

  async get(url: string) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: this.apiKey }),
    };

    const response = await fetch(this.baseUrl + url, {
      headers,
    });

    if (!response.ok) {
      throw new Error("예기치 못한 오류가 발생했습니다.");
    }

    return response.json();
  }

  async post<T>(url: string, data: T) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: this.apiKey }),
    };

    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("예기치 못한 오류가 발생했습니다.");
    }

    return response.json();
  }

  async delete(url: string) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: this.apiKey }),
    };

    const response = await fetch(this.baseUrl + url, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error("예기치 못한 오류가 발생했습니다.");
    }

    return response.json();
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
export const httpClient = new HTTPClient(BASE_URL, API_KEY);

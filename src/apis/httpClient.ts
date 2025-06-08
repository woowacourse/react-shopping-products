const getApiBaseUrl = () => {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    return "https://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/";
  }
  return import.meta.env.VITE_API_BASE_URL;
};

export const API_BASE_URL = getApiBaseUrl();
export const API_TOKEN = import.meta.env.VITE_TOKEN;

class HTTPClient {
  baseUrl = "";
  apiKey = "";

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey || "";
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: `Basic ${this.apiKey}` }),
    };
  }

  async get(url: string) {
    const response = await fetch(this.baseUrl + url, {
      headers: this.getHeaders(),
    });

    return response;
  }

  async post<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return response;
  }

  async patch<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return response;
  }

  async delete(url: string) {
    const response = await fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    return response;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

export const httpClient = new HTTPClient(API_BASE_URL, API_TOKEN);

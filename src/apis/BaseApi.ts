export default class BaseApi {
  static baseUrl = import.meta.env.VITE_API_URL;

  static async get(path: string, options?: RequestInit) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: { Authorization: `Basic ${import.meta.env.VITE_TOKEN}` },
      ...options,
    });
    return response.json();
  }

  static async post(path: string, options?: RequestInit) {
    await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });
  }

  static async put(path: string, options?: RequestInit) {
    await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });
  }

  static async delete(path: string, options?: RequestInit) {
    await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });
  }
}

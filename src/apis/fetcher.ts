import CustomError from "@/apis/error";
import { basicToken } from "@/utils/auth";

interface RequestProps {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  body?: Record<string, string | number>;
  headers?: Record<string, string>;
}
type FetchProps = Omit<RequestProps, "method">;

const request = async ({ url, method, body, headers = {} }: RequestProps) => {
  try {
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        Authorization: basicToken,
        ...headers,
      },
    });

    if (!response.ok) {
      throw new CustomError(response.status);
    }

    return response;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(0);
  }
};

const fetcher = {
  get({ url, headers }: FetchProps) {
    return request({ url, method: "GET", headers });
  },

  post({ url, body, headers }: FetchProps) {
    return request({ url, method: "POST", body, headers: { ...headers, "Content-Type": "application/json" } });
  },

  delete({ url, headers }: FetchProps) {
    return request({ url, method: "DELETE", headers });
  },

  patch({ url, body, headers }: FetchProps) {
    return request({ url, method: "PATCH", body, headers: { ...headers, "Content-Type": "application/json" } });
  },

  put({ url, headers }: FetchProps) {
    return request({ url, method: "PUT", headers: { ...headers, "Content-Type": "application/json" } });
  },
};

export default fetcher;

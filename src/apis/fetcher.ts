import CustomError from "@/apis/error";
import { HTTP_STATUS_CODE } from "@/error/errorMessage";
import { basicToken } from "@/utils/auth";

interface RequestProps {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  body?: Record<string, string | number>;
  headers?: Record<string, string>;
  errorMessage?: string;
}
type FetchProps = Omit<RequestProps, "method">;

const request = async ({ url, method, body, headers = {} }: RequestProps) => {
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
};

const networkRequest = async ({ url, method, body, headers = {} }: RequestProps) => {
  const response = await request({ url, method, body, headers });
  if (!response) {
    throw new CustomError(HTTP_STATUS_CODE.NETWORK_ERROR);
  }
  return response;
};

const fetcher = {
  get({ url, headers }: FetchProps) {
    return networkRequest({ url, method: "GET", headers });
  },

  post({ url, body, headers }: FetchProps) {
    return networkRequest({ url, method: "POST", body, headers: { ...headers, "Content-Type": "application/json" } });
  },

  delete({ url, headers }: FetchProps) {
    return networkRequest({ url, method: "DELETE", headers });
  },

  patch({ url, body, headers }: FetchProps) {
    return networkRequest({ url, method: "PATCH", body, headers: { ...headers, "Content-Type": "application/json" } });
  },

  put({ url, headers }: FetchProps) {
    return networkRequest({ url, method: "PUT", headers: { ...headers, "Content-Type": "application/json" } });
  },
};

export default fetcher;

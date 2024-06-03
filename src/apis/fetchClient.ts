import { ERROR_MESSAGE } from "../constants/apis";
import { HTTPMethod } from "../types/apis";

interface FetchOption {
  url: string;
  method: HTTPMethod;
  body?: object;
  token?: string;
}

export async function fetchClient({ url, method, body, token }: FetchOption) {
  try {
    const headers = getHeaders(token);
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(getResponseErrorMessage(response.status));
    }

    const contentType = response.headers.get("content-type");

    return getResponseByContentType(response, contentType);
  } catch (error) {
    throw new Error(getNetworkErrorMessage(error));
  }
}

function getHeaders(token?: string): Record<string, string> {
  const headers = { "Content-type": "application/json" };

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

function getResponseByContentType(response: Response, contentType: string | null) {
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  if (
    contentType?.includes("image/") ||
    contentType?.includes("application/octet-stream") ||
    contentType?.includes("application/pdf")
  ) {
    return response.blob();
  }

  return response.text();
}

function getResponseErrorMessage(status: number, defaultErrorMessage?: string): string {
  if (status >= 500) {
    return ERROR_MESSAGE.SERVER_ERROR;
  }
  if (status === 401 || status === 403) {
    return ERROR_MESSAGE.AUTHENTICATION_FAILED;
  }
  if (status >= 400) {
    return defaultErrorMessage ?? ERROR_MESSAGE.FETCHING_FAILED;
  }
  return ERROR_MESSAGE.UNKNOWN_ERROR;
}

function getNetworkErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return ERROR_MESSAGE.NETWORK_DISCONNECTED;
  }
  return ERROR_MESSAGE.UNKNOWN_ERROR;
}

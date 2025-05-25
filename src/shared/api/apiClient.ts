import { SHOP_API } from "./config";

export interface ApiError {
  error: string;
  status?: number;
}

export interface ApiSuccess {
  success: true;
}

export type ApiResponse<T> = T | ApiError;

export const isApiError = (
  response: unknown
): response is { error: string } => {
  return (
    response !== null &&
    response !== undefined &&
    typeof response === "object" &&
    "error" in response &&
    typeof (response as ApiError).error === "string"
  );
};

export const isApiSuccess = (response: unknown): response is ApiSuccess => {
  return (
    response !== null &&
    response !== undefined &&
    typeof response === "object" &&
    "success" in response &&
    (response as ApiSuccess).success === true
  );
};

export const createApiUrl = (
  endpoint: string,
  params?: Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  return `${SHOP_API.baseUrl}${endpoint}?${searchParams.toString()}`;
};

const applyDefaultHeaders = (options: RequestInit = {}): RequestInit => {
  return {
    ...options,
    headers: { ...SHOP_API.headers.default, ...(options.headers || {}) },
  };
};

const ERROR_MESSAGES: Record<number, string> = {
  400: "잘못된 요청입니다. 입력값을 다시 확인해주세요.",
  401: "인증이 필요합니다. 로그인 후 다시 시도해주세요.",
  403: "접근이 거부되었습니다. 권한을 확인해주세요.",
  404: "요청한 리소스를 찾을 수 없습니다.",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export const fetchAPI = async <T = ApiSuccess>(
  url: string,
  options?: RequestInit,
  parseJson: boolean = true
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, applyDefaultHeaders(options));

    if (!response.ok) {
      const status = response.status;
      const message =
        ERROR_MESSAGES[status] || `에러가 발생했습니다. (코드: ${status})`;

      return { error: message, status };
    }

    if (parseJson) return await response.json();
    return { success: true } as T;
  } catch (error) {
    if (error instanceof Error) {
      return { error: `네트워크 에러: ${error.message}` };
    }

    return { error: "예기치 못한 오류가 발생했습니다. 다시 시도해주세요." };
  }
};

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

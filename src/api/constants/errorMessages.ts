export const API_ERROR_MESSAGES: Record<number, string> = {
  400: "잘못된 요청입니다. 입력값을 확인해주세요.",
  401: "서비스에 접속할 수 없습니다. 잠시 후 다시 시도하거나 관리자에게 문의하세요.",
  403: "접근 권한이 없습니다.",
  404: "요청한 리소스를 찾을 수 없습니다.",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
} as const;

export const DEFAULT_ERROR_MESSAGE = "알수없는 오류가 발생했습니다.";

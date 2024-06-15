export type HTTP_ERROR = {
  title: string;
  content: string;
};

export const CUSTOM_ERROR_MESSAGE: Partial<Record<keyof typeof HTTP_STATUS_CODE, HTTP_ERROR>> = {
  SERVER_ERROR: {
    title: "서버에 에러가 생겼습니다",
    content: "다시 시도해 주세요.",
  },
  NOT_FOUND: {
    title: "요청하신 자료를 찾을 수 없습니다.",
    content: "다시 시도해 주세요.",
  },
  FORBIDDEN: {
    title: "요청하신 자료에 접근할 권한이 없습니다.",
    content: "다시 시도해 주세요.",
  },
  UNAUTHORIZED: {
    title: "유효한 인증이 필요합니다.",
    content: "다시 시도해 주세요.",
  },
  BAD_REQUEST: {
    title: "잘못된 요청입니다.",
    content: "다시 시도해 주세요.",
  },
  NETWORK_ERROR: {
    title: "네트워크 연결이 끊어졌습니다.",
    content: "다시 시도해 주세요.",
  },
};

export const HTTP_STATUS_CODE = {
  OK: 200,
  NETWORK_ERROR: 0,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

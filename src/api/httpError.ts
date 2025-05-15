export const STATUS_MESSAGE = {
  400: '잘못된 요청입니다.',
  401: '인증되지 않은 사용자입니다.',
  403: '접근 권한이 없습니다.',
  404: '요청하신 페이지를 찾을 수 없습니다.',
  500: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
} as const;
export type StatusCode = keyof typeof STATUS_MESSAGE;

export const isValidStatusCode = (status: number): status is StatusCode => {
  return Object.keys(STATUS_MESSAGE).includes(status.toString());
};

export class HttpError extends Error {
  public readonly status: number | undefined;

  constructor(status: number) {
    const message = isValidStatusCode(status)
      ? STATUS_MESSAGE[status]
      : '알 수 없는 오류가 발생했습니다.';
    super(message);
    this.status = status;
  }
}

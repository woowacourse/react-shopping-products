export const ERROR_MESSAGE = {
  SERVER_ERROR: "서버에 에러가 생겼습니다",
  NOT_FOUND: "요청하신 자료를 찾을 수 없습니다.",
  FORBIDDEN: "요청하신 자료에 접근할 권한이 없습니다.",
  UNAUTHORIZED: "유효한 인증이 필요합니다.",
  BAD_REQUEST: "잘못된 요청입니다.",
  NETWORK_ERROR: "네트워크 연결이 끊어졌습니다.",
  FETCH_FAILED: "서버와 연결이 되지 않습니다.",
};

class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super();
    this.statusCode = statusCode;

    switch (true) {
      case statusCode === 0:
        this.name = "NETWORK_ERROR";
        this.message = ERROR_MESSAGE.NETWORK_ERROR;
        break;
      case statusCode >= 500:
        this.name = "SERVER_ERROR";
        this.message = ERROR_MESSAGE.SERVER_ERROR;
        break;
      case statusCode === 404:
        this.name = "NOT_FOUND";
        this.message = ERROR_MESSAGE.NOT_FOUND;
        break;
      case statusCode === 403:
        this.name = "FORBIDDEN";
        this.message = ERROR_MESSAGE.FORBIDDEN;
        break;
      case statusCode === 401:
        this.name = "UNAUTHORIZED";
        this.message = ERROR_MESSAGE.UNAUTHORIZED;
        break;
      default:
        this.name = "FETCHING_ERROR";
        this.message = ERROR_MESSAGE.FETCH_FAILED;
        break;
    }
  }
}

export default CustomError;

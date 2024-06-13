import { CUSTOM_ERROR_MESSAGE, HTTP_STATUS_CODE } from "@/error/errorMessage";

class HTTPError extends Error {
  statusCode: number;
  title: string;
  content: string;

  constructor(statusCode: number) {
    super();
    this.statusCode = statusCode;

    let errorInfo = CUSTOM_ERROR_MESSAGE.SERVER_ERROR;
    switch (true) {
      case statusCode >= HTTP_STATUS_CODE.SERVER_ERROR:
        errorInfo = CUSTOM_ERROR_MESSAGE.SERVER_ERROR;
        this.name = "SERVER_ERROR";
        break;
      case statusCode === HTTP_STATUS_CODE.NOT_FOUND:
        errorInfo = CUSTOM_ERROR_MESSAGE.NOT_FOUND;
        this.name = "NOT_FOUND";
        break;
      case statusCode === HTTP_STATUS_CODE.FORBIDDEN:
        errorInfo = CUSTOM_ERROR_MESSAGE.FORBIDDEN;
        this.name = "FORBIDDEN";
        break;
      case statusCode === HTTP_STATUS_CODE.UNAUTHORIZED:
        errorInfo = CUSTOM_ERROR_MESSAGE.UNAUTHORIZED;
        this.name = "UNAUTHORIZED";
        break;
      case statusCode === HTTP_STATUS_CODE.BAD_REQUEST:
        errorInfo = CUSTOM_ERROR_MESSAGE.BAD_REQUEST;
        this.name = "BAD_REQUEST";
        break;
      case statusCode === HTTP_STATUS_CODE.NETWORK_ERROR:
        errorInfo = CUSTOM_ERROR_MESSAGE.NETWORK_ERROR;
        this.name = "NETWORK_ERROR";
        break;
      default:
        errorInfo = { title: "데이터 가져오기에 실패했습니다.", content: "다시 시도해 주세요." };
        this.name = "UNKNOWN_ERROR";
        break;
    }

    this.message = errorInfo?.title || "에러";
    this.title = errorInfo?.title || "에러";
    this.content = errorInfo?.content || "에러가 발생했습니다.";
  }
}

export default HTTPError;

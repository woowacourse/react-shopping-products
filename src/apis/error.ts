import { CUSTOM_ERROR_MESSAGE, HTTP_STATUS_CODE } from "@/types/error";

class HTTPError extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super();
    this.statusCode = statusCode;

    switch (true) {
      case statusCode >= HTTP_STATUS_CODE.SERVER_ERROR:
        this.name = "서버 에러가 발생했습니다.";
        this.message = CUSTOM_ERROR_MESSAGE.SERVER_ERROR;
        break;
      case statusCode === HTTP_STATUS_CODE.NOT_FOUND:
        this.name = "NOT_FOUND";
        this.message = CUSTOM_ERROR_MESSAGE.NOT_FOUND;
        break;
      case statusCode === HTTP_STATUS_CODE.FORBIDDEN:
        this.name = "FORBIDDEN";
        this.message = CUSTOM_ERROR_MESSAGE.FORBIDDEN;
        break;
      case statusCode === HTTP_STATUS_CODE.UNAUTHORIZED:
        this.name = "UNAUTHORIZED";
        this.message = CUSTOM_ERROR_MESSAGE.UNAUTHORIZED;
        break;
      default:
        this.name = "FETCHING_ERROR";
        this.message = CUSTOM_ERROR_MESSAGE.FETCH_FAILED;
        break;
    }
  }
}

export default HTTPError;

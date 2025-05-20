import ERROR_MESSAGE from '../constants/ERROR_MESSAGE';

const handleHttpError = (response: Response) => {
  if (response.status === 400) {
    throw new Error(ERROR_MESSAGE.WRONG_REQUEST);
  }
  if (response.status === 401) {
    throw new Error(ERROR_MESSAGE.NO_AUTH);
  }
  if (response.status === 403) {
    throw new Error(ERROR_MESSAGE.WRONG_AUTH);
  }
  if (response.status === 404) {
    throw new Error(ERROR_MESSAGE.NO_PAGE);
  }
  if (response.status === 500) {
    throw new Error(ERROR_MESSAGE.WRONG_SERVER);
  }
};

export default handleHttpError;

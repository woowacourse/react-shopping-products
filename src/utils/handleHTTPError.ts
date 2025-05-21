import ERROR_MESSAGE from '../constants/ERROR_MESSAGE';

const handleHttpError = async (response: Response) => {
  if (response.ok) return;

  let errorData: { errorCode?: string } = {};

  try {
    errorData = await response.json();
  } catch (_) {
    console.error('handleHttpError');
  }

  if (response.status === 400) {
    if (errorData.errorCode === 'OUT_OF_STOCK') {
      throw new Error(ERROR_MESSAGE.OUT_OF_STOCK);
    }
    throw new Error(ERROR_MESSAGE.WRONG_REQUEST);
  }
  if (response.status === 401) throw new Error(ERROR_MESSAGE.NO_AUTH);
  if (response.status === 403) throw new Error(ERROR_MESSAGE.WRONG_AUTH);
  if (response.status === 404) throw new Error(ERROR_MESSAGE.NO_PAGE);
  if (response.status === 500) throw new Error(ERROR_MESSAGE.WRONG_SERVER);
};

export default handleHttpError;

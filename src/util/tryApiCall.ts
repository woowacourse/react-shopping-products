import { DEFAULT_ERROR_MESSAGE } from '../constants/errorMessages';

const tryApiCall = async <T>(
  apiCall: () => Promise<T>,
  handleErrorToast: (errorMessage: string) => void,
) => {
  try {
    const data = await apiCall();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
    handleErrorToast(message);
    setTimeout(() => {
      handleErrorToast('');
    }, 3000);

    return undefined as T;
  }
};

export default tryApiCall;

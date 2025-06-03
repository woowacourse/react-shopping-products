import { RETRY_ERROR_MESSAGE } from '../constants/errorMessages';

interface RetryFetch {
  apiCall: () => Promise<void>;
  retryCount?: number;
  delay?: number;
}

const DEFAULT_RETRY_COUNT = 3;
const DEFAULT_DELAY = 1000;

const retryFetch = async ({
  apiCall,
  retryCount = DEFAULT_RETRY_COUNT,
  delay = DEFAULT_DELAY,
}: RetryFetch) => {
  try {
    return await apiCall();
  } catch (error) {
    if (retryCount > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryFetch({ apiCall, retryCount: retryCount - 1, delay });
    }

    throw new Error(RETRY_ERROR_MESSAGE);
  }
};

export default retryFetch;

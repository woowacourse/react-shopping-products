import { useCallback, useContext, useState } from 'react';

import { ToastContext } from '../context/ToastProvider';

export const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const handleRequest = useCallback(
    async <T, R = T>(
      apiCall: () => Promise<T>,
      onSuccess: (data: T) => R,
      errorData?: T,
      options?: { delay?: number },
      onError?: (error: Error) => void
    ): Promise<T | R | undefined> => {
      try {
        setIsLoading(true);

        if (options && options.delay) {
          await new Promise((resolve) => setTimeout(resolve, options.delay));
        }

        const data = await apiCall();
        return onSuccess ? onSuccess(data) : data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        showToast(error.message);
        onError && onError(error);
        errorData && onSuccess(errorData);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast]
  );

  return { isLoading, handleRequest };
};

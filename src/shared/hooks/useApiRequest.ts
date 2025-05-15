import { useCallback, useContext, useState } from 'react';

import { ToastContext } from '../context/ToastProvider';

export const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const handleRequest = useCallback(
    async <T, R = T>(
      apiCall: () => Promise<T>,
      setCallback: (data: T) => R,
      errorData?: T,
      options?: { delay?: number }
    ): Promise<T | R | undefined> => {
      try {
        setIsLoading(true);

        if (options && options.delay) {
          await new Promise((resolve) => setTimeout(resolve, options.delay));
        }

        const data = await apiCall();
        return setCallback ? setCallback(data) : data;
      } catch (err) {
        showToast((err as Error).message);
        errorData && setCallback(errorData);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast]
  );

  return { isLoading, handleRequest };
};

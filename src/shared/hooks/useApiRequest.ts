import { useCallback, useContext, useState } from 'react';

import { ToastContext } from '../context/ToastProvider';

export const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const handleRequest = useCallback(
    async <T, R = T>(
      apiCall: () => Promise<T>,
      setCallback: (data: T) => R,
      errorData?: T
    ): Promise<T | R | undefined> => {
      try {
        setIsLoading(true);
        const data = await apiCall();
        return setCallback ? setCallback(data) : data;
      } catch (err) {
        showToast((err as Error).message);
        return errorData;
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    },
    [showToast]
  );

  return { isLoading, handleRequest };
};

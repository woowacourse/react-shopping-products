import { useCallback, useContext, useState } from 'react';

import { ToastContext } from '../context/ToastProvider';

type ApiRequestProps<T> = {
  apiCall: () => Promise<T>;
  onSuccess: (data: T) => void;
  options?: { delay?: number };
};
export const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const handleRequest = useCallback(
    async <T, R = T>({
      apiCall,
      onSuccess,
      options,
    }: ApiRequestProps<T>): Promise<T | R | undefined> => {
      try {
        setIsLoading(true);
        if (options && options.delay) {
          await new Promise((resolve) => setTimeout(resolve, options.delay));
        }
        const data = await apiCall();
        onSuccess(data);
        return;
      } catch (err) {
        showToast((err as Error).message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast]
  );

  return { isLoading, handleRequest };
};

import { useCallback } from 'react';

interface useFetchDataProps {
  dataName: string;
}

interface FetchDataProps<T> {
  apiCall: () => Promise<T | void>;
  onSuccess: (data?: T | void) => void;
  onError: (error: Error | unknown) => void;
  handleLoading: (isLoading: boolean, dataName: string) => void;
}

const useFetchData = <T>({ dataName }: useFetchDataProps) => {
  const fetchData = useCallback(
    async ({ apiCall, onSuccess, onError, handleLoading }: FetchDataProps<T>) => {
      try {
        handleLoading(true, dataName);
        onSuccess(await apiCall());
      } catch (error) {
        onError(error);
      } finally {
        handleLoading(false, dataName);
      }
    },
    [dataName],
  );

  return {
    fetchData,
  };
};

export default useFetchData;

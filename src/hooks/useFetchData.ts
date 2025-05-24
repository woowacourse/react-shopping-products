import { useCallback } from 'react';
import useDataContext from './useDataContext';

interface useFetchDataProps {
  dataName: string;
}

interface FetchDataProps<T> {
  apiCall: () => Promise<T | undefined>;
  onSuccess: (data?: T) => void;
  onError: (error: Error | unknown) => void;
}

const useFetchData = <T>({ dataName }: useFetchDataProps) => {
  const { handleLoading } = useDataContext();

  const fetchData = useCallback(
    async ({ apiCall, onSuccess, onError }: FetchDataProps<T>) => {
      try {
        handleLoading(true, dataName);
        const fetchedData = await apiCall();
        onSuccess(fetchedData);
      } catch (error) {
        onError(error);
      } finally {
        handleLoading(false, dataName);
      }
    },
    [handleLoading, dataName],
  );

  return {
    fetchData,
  };
};

export default useFetchData;

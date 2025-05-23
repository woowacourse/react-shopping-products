import { useCallback } from 'react';
import useDataContext from './useDataContext';

interface useFetchDataProps {
  dataName: string;
}

interface FetchDataProps<T> {
  apiCall: () => Promise<T | void>;
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
        if (fetchedData) {
          onSuccess(fetchedData);
        } else {
          onSuccess();
        }
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

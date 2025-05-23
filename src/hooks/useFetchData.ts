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
  const { data, setData, isLoading, setIsLoading } = useDataContext();

  const handleLoading = useCallback(
    (dataLoading: boolean) => {
      setIsLoading((prev) => new Map(prev).set(dataName, dataLoading));
    },
    [dataName, setIsLoading],
  );

  const fetchData = useCallback(
    async ({ apiCall, onSuccess, onError }: FetchDataProps<T>) => {
      try {
        handleLoading(true);
        const fetchedData = await apiCall();
        if (fetchedData) {
          onSuccess(fetchedData);
        } else {
          onSuccess();
        }
      } catch (error) {
        onError(error);
      } finally {
        handleLoading(false);
      }
    },
    [handleLoading],
  );

  return {
    dataMap: data,
    setDataMap: setData,
    data: data.get(dataName) as T,
    isLoading: isLoading.get(dataName),
    setIsLoading,
    fetchData,
  };
};

export default useFetchData;

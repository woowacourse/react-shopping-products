import { useCallback, useState } from 'react';

interface useFetchDataProps<T> {
  apiCall: () => Promise<T>;
  dataName: string;
  onSuccess: (data: T, updateHandler: (value: T) => void) => void;
  onError: (error: Error | unknown) => void;
}

const useFetchData = <T>({ apiCall, dataName, onSuccess, onError }: useFetchDataProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Map<string, T>>(new Map());
  const updateHandler = useCallback(
    (newData: T) => {
      setData((prev) => new Map(prev).set(dataName, newData));
    },
    [dataName],
  );

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const fetchedData = await apiCall();
      if (fetchedData && onSuccess) {
        onSuccess(fetchedData, updateHandler);
      }
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, updateHandler, onSuccess, onError]);

  return {
    dataMap: data,
    data: data.get(dataName),
    updateHandler,
    isLoading,
    fetchData,
  };
};

export default useFetchData;

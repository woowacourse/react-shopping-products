import { useCallback, useState } from 'react';

interface useFetcherProps<T> {
  apiCall: () => Promise<T>;
  dataName: string;
  onSuccess: (data: T, updateHandler: (name: string, value: T) => void) => void;
  onError: (error: Error | unknown) => void;
}

const useFetcher = <T>({ apiCall, dataName, onSuccess, onError }: useFetcherProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Map<string, T>>(new Map());

  const updateHandler = useCallback((name: string, newData: T) => {
    setData((prev) => new Map(prev).set(name, newData));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const fetchedData = await apiCall();
      if (fetchedData) {
        onSuccess(fetchedData, updateHandler);
      }
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, dataName, onSuccess, onError]);

  return {
    data,
    updateHandler,
    isLoading,
    fetchData,
  };
};

export default useFetcher;

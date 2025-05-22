import { useCallback, useState } from 'react';

interface useFetcherProps<T> {
  apiCall: () => Promise<T>;
  dataName: string;
  onError: (error: Error | unknown) => void;
}

const useFetcher = <T>({ apiCall, dataName, onError }: useFetcherProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Map<string, T>>(new Map());

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const fetchedData = await apiCall();
      if (fetchedData) {
        setData((prev) => prev.set(dataName, fetchedData));
      }
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, dataName, onError]);

  return {
    data,
    setData,
    isLoading,
    fetchData,
  };
};

export default useFetcher;

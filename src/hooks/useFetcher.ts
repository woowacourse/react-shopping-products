import { useState } from 'react';

interface useFetcherProps<T> {
  apiCall: () => Promise<T>;
  dataName: string;
  onError: (error: Error | unknown) => void;
}

const useFetcher = async <T>({ apiCall, dataName, onError }: useFetcherProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Map<string, T>>(new Map());

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

  return {
    data,
    setData,
    isLoading,
  };
};

export default useFetcher;

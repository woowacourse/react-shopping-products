import { useCallback, useState } from 'react';

type UpdaterType<T> = (prev: T | undefined) => T;
interface useFetchDataProps<T> {
  apiCall: () => Promise<T>;
  dataName: string;
  onSuccess: (data: T, dataHandler: (value: T) => void) => void;
  onError: (error: Error | unknown) => void;
}

const useFetchData = <T>({ apiCall, dataName, onSuccess, onError }: useFetchDataProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Map<string, T>>(new Map());
  const replaceHandler = useCallback(
    (newData: T) => {
      setData((prev) => new Map(prev).set(dataName, newData));
    },
    [dataName],
  );

  const updateHandler = useCallback(
    (updater: UpdaterType<T>) => {
      setData((prev) => {
        const prevData = prev.get(dataName);
        const newData = updater(prevData);
        return new Map(prev).set(dataName, newData);
      });
    },
    [dataName],
  );

  const fetchData = useCallback(
    async (dataHandler = replaceHandler) => {
      try {
        setIsLoading(true);

        const fetchedData = await apiCall();
        if (fetchedData && onSuccess) {
          onSuccess(fetchedData, dataHandler);
        }
      } catch (error) {
        onError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiCall, onSuccess, onError],
  );

  return {
    data,
    replaceHandler,
    updateHandler,
    isLoading,
    fetchData,
  };
};

export default useFetchData;

import { useEffect, useState } from 'react';
import type { DataResourceType } from '../types/data';
import type { LoadingStateType } from '../types/types';

interface UseDataProps<T> {
  fetchFunc: () => Promise<T>;
}

const useData = <T>({ fetchFunc }: UseDataProps<T>): DataResourceType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingStateType>('loadingInitial');
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoadingState('loadingInitial');
    try {
      const newData = await fetchFunc();
      setData(newData);
      setLoadingState('success');
      return newData;
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      setLoadingState('success');
      return null;
    }
  };

  //biome-ignore lint/correctness/useExhaustiveDependencies: --
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loadingState, error, refetch: fetchData };
};

export default useData;

import { useEffect, useState } from 'react';
import type { DataResourceType } from '../types/data';
import type { LoadingStateType } from '../types/types';

interface UseDataProps<T, A extends unknown[]> {
  fetchFunc: (...args: A) => Promise<T>;
  defaultArgs: A;
}

const useData = <T, A extends unknown[]>({
  fetchFunc,
  defaultArgs,
}: UseDataProps<T, A>): DataResourceType<T> & { refetch: (...args: A) => Promise<T | null> } => {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingStateType>('loadingInitial');
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (...args: A): Promise<T | null> => {
    setLoadingState('loadingInitial');
    try {
      const result = await fetchFunc(...args);
      setData(result);
      setLoadingState('success');
      return result;
    } catch (err) {
      if (err instanceof Error) setError(err);
      setLoadingState('error');
      return null;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: --
  useEffect(() => {
    fetchData(...defaultArgs);
  }, []);

  return {
    data,
    loadingState,
    error,
    refetch: fetchData,
  };
};

export default useData;

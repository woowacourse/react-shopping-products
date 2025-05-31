import { useEffect, useCallback } from 'react';
import { useDataContext } from '../context/DataContext';
import type { CacheKey } from '../utils/cacheKeys';

interface UseDataOptions<T> {
  key: CacheKey;
  fetchFn: () => Promise<T>;
  deps?: unknown[];
}

interface UseDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string;
  refetch: () => Promise<void>;
}

export function useData<T>({ key, fetchFn, deps = [] }: UseDataOptions<T>): UseDataResult<T> {
  const { state, fetchData } = useDataContext();

  const currentState = state[key] || { data: null, isLoading: false, error: '' };

  const refetch = useCallback(() => {
    return fetchData<T>(key, fetchFn);
  }, [key, fetchFn, fetchData]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ...deps]);

  return {
    data: currentState.data as T | null,
    isLoading: currentState.isLoading,
    error: currentState.error,
    refetch,
  };
}

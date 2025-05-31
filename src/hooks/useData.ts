import { useEffect, useCallback } from 'react';
import { useDataContext } from '../context/DataContext';
import type { CacheKey } from '../utils/cacheKeys';
import type { DataStateItem } from '../context/DataContext';

interface UseDataOptions<T> {
  key: CacheKey;
  fetchFn: () => Promise<T>;
  deps?: unknown[];
}

interface UseDataResult<T> extends DataStateItem<T> {
  refetch: () => Promise<void>;
}

export function useData<T>({ key, fetchFn, deps = [] }: UseDataOptions<T>): UseDataResult<T> {
  const { fetchData, getTypedData } = useDataContext();

  const currentState = getTypedData<T>(key);

  const refetch = useCallback(() => {
    return fetchData<T>(key, fetchFn);
  }, [key, fetchFn, fetchData]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ...deps]);

  return {
    ...currentState,
    refetch,
  };
}

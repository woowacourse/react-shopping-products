import { useEffect, useCallback } from 'react';
import { useDataContext } from '../context/DataContext';
import type { CacheKey } from '../utils/cacheKeys';
import type { DataStateItem } from '../context/DataContext';

interface UseDataOptions<T> {
  key: CacheKey;
  fetchFn: () => Promise<T>;
  deps?: unknown[];
  enabled?: boolean;
}

interface UseDataResult<T> extends DataStateItem<T> {
  refetch: () => Promise<void>;
}

export function useData<T>({
  key,
  fetchFn,
  deps = [],
  enabled = true,
}: UseDataOptions<T>): UseDataResult<T> {
  const { fetchData, getTypedData } = useDataContext();

  const currentState = getTypedData<T>(key);

  const refetch = useCallback(() => {
    return fetchData<T>(key, fetchFn, { forceRefresh: true });
  }, [key, fetchFn, fetchData]);

  useEffect(() => {
    if (!enabled) return;

    if (!currentState.data && !currentState.isLoading) {
      fetchData<T>(key, fetchFn);
    }
  }, [key, enabled, fetchData, fetchFn, currentState.data, currentState.isLoading, ...deps]);

  return {
    ...currentState,
    refetch,
  };
}

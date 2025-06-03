import { useState, useEffect, useCallback, useRef } from 'react';
import { useDataContext } from '../context/DataContext';

interface UseDataOptions {
  cacheTime?: number;
  refetchOnMount?: boolean;
  retry?: number;
  retryDelay?: number;
}

interface UseDataReturn<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const DEFAULT_OPTIONS: UseDataOptions = {
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: true,
  retry: 3,
  retryDelay: 1000,
};

export function useData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseDataOptions = {},
): UseDataReturn<T> {
  const { getCache, setCache } = useDataContext();
  const [, forceUpdate] = useState({});
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  const cached = getCache<T>(key) || {
    data: null,
    error: null,
    isLoading: false,
    lastFetchedAt: null,
  };

  const isCacheValid = useCallback(() => {
    if (!cached.lastFetchedAt) {
      return false;
    }

    if (mergedOptions.cacheTime == null) {
      return true;
    }

    if (mergedOptions.cacheTime <= 0) {
      return false;
    }

    return Date.now() - cached.lastFetchedAt < mergedOptions.cacheTime;
  }, [cached.lastFetchedAt, mergedOptions.cacheTime]);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setCache(key, {
      ...cached,
      isLoading: true,
      error: null,
    });
    forceUpdate({});

    try {
      const data = await fetcher();

      setCache(key, {
        data,
        error: null,
        isLoading: false,
        lastFetchedAt: Date.now(),
      });
      retryCountRef.current = 0;
      forceUpdate({});
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      if (retryCountRef.current < mergedOptions.retry!) {
        retryCountRef.current++;
        const delay = mergedOptions.retryDelay! * Math.pow(2, retryCountRef.current - 1); // Exponential backoff
        setTimeout(() => {
          if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
            fetchData();
          }
        }, delay);
        return;
      }

      setCache(key, {
        data: cached.data,
        error: error instanceof Error ? error : new Error('Unknown error'),
        isLoading: false,
        lastFetchedAt: cached.lastFetchedAt,
      });
      retryCountRef.current = 0;
      forceUpdate({});
    }
  }, [key, fetcher, cached, setCache, mergedOptions.retry, mergedOptions.retryDelay]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isCacheValid() || (mergedOptions.refetchOnMount && !cached.data)) {
      fetchData();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [key]);

  return {
    data: cached.data,
    error: cached.error,
    isLoading: cached.isLoading,
    refetch,
  };
}

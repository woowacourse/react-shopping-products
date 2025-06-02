import { useEffect, useCallback, useRef } from "react";
import { useDataContext } from "../context/DataContext";

interface FetchOptions {
  autoFetch?: boolean;
  deps?: unknown[];
  retryCount?: number;
  retryDelay?: number;
}

interface FetchResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDataFetch<T>(
  key: string,
  fetcher: (() => Promise<T>) | null,
  options: FetchOptions = {}
): FetchResult<T> {
  const { getData, setLoading, setData, setError, initState } =
    useDataContext();
  const {
    autoFetch = true,
    deps = [],
    retryCount = 0,
    retryDelay = 1000,
  } = options;

  const retryCountRef = useRef(0);
  const isMountedRef = useRef(true);
  const prevDepsRef = useRef<unknown[]>([]);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    const currentData = getData<T>(key);
    if (!currentData) {
      initState(key);
    }
  }, [key, getData, initState]);

  const depsChanged = useCallback(() => {
    const currentDeps = deps;
    const prevDeps = prevDepsRef.current;

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return true;
    }

    if (currentDeps.length !== prevDeps.length) {
      return true;
    }

    for (let i = 0; i < currentDeps.length; i++) {
      if (currentDeps[i] !== prevDeps[i]) {
        return true;
      }
    }

    return false;
  }, [deps]);

  const executeFetch = async (): Promise<void> => {
    if (!fetcher || !isMountedRef.current) return;

    try {
      setLoading(key, true);
      setError(key, null);

      const result = await fetcher();

      if (!isMountedRef.current) return;

      setData(key, Array.isArray(result) ? result : [result]);
      retryCountRef.current = 0;
    } catch (error) {
      console.error(`[useDataFetch ${key}] 에러 발생:`, error);

      if (!isMountedRef.current) return;

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (retryCountRef.current < retryCount) {
        retryCountRef.current += 1;

        setTimeout(() => {
          if (isMountedRef.current) {
            executeFetch();
          }
        }, retryDelay);
        return;
      }

      setError(key, errorMessage);
      retryCountRef.current = 0;
    }
  };

  const refetch = useCallback(async (): Promise<void> => {
    if (!fetcher) {
      console.warn(`[useDataFetch ${key}] refetch 호출되었지만 fetcher가 없음`);
      return;
    }

    retryCountRef.current = 0;
    await executeFetch();
  }, [fetcher, key]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!autoFetch || !fetcher) {
      return;
    }

    const shouldFetch = depsChanged();

    if (shouldFetch) {
      prevDepsRef.current = [...deps];
      executeFetch();
    }
  }, [autoFetch, fetcher, depsChanged]);

  const currentState = getData<T>(key);

  return {
    data: (currentState?.data as T) || ([] as T),
    loading: currentState?.loading || false,
    error: currentState?.error || null,
    refetch,
  };
}

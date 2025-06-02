import { useEffect, useCallback, useRef } from "react";
import { useDataContext } from "../context/DataContext";

interface FetchOptions {
  autoFetch?: boolean;
  /**
   * 의존성 배열 - React useEffect와 동일한 얕은 비교 방식
   * 객체나 배열 참조값 변경은 감지되지 않습니다.
   */
  deps?: unknown[];
}

interface FetchResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export function useDataFetch<T>(
  key: string,
  fetcher: (() => Promise<T>) | null,
  options: FetchOptions = {}
): FetchResult<T> {
  const { getData, setLoading, setData, setError, initState } =
    useDataContext();
  const { autoFetch = true, deps = [] } = options;

  const prevDepsRef = useRef<unknown[] | null>(null);

  useEffect(() => {
    const currentData = getData<T>(key);
    if (!currentData) {
      initState(key);
    }
  }, [key, getData, initState]);

  const depsChanged = useCallback(() => {
    const currentDeps = deps;
    const prevDeps = prevDepsRef.current;

    if (prevDeps === null) {
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
    if (!fetcher) return;

    try {
      setLoading(key, true);
      setError(key, null);

      const result = await fetcher();
      setData(key, Array.isArray(result) ? result : [result]);
    } catch (error) {
      console.error(`[useDataFetch ${key}] 에러 발생:`, error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(key, errorMessage);
    }
  };

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
  };
}

import { useEffect, useCallback, useRef } from "react";
import { useDataContext } from "../context/DataContext";
import { ResponseProduct, ResponseCartItem } from "../api/types";

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

export function useDataFetch<T extends ResponseProduct[] | ResponseCartItem[]>(
  key: string,
  fetcher: (() => Promise<T>) | null,
  options: FetchOptions = {}
): FetchResult<T> {
  const { state } = useDataContext();
  const {
    autoFetch = true,
    deps = [],
    retryCount = 0,
    retryDelay = 1000,
  } = options;

  const retryCountRef = useRef(0);
  const isMountedRef = useRef(true);

  // 이전 deps 저장 (깊은 비교용)
  const prevDepsRef = useRef<unknown[]>([]);
  const isFirstRenderRef = useRef(true);

  function getCurrentState() {
    if (key === "products") {
      return state.products;
    } else if (key === "cart-items") {
      return state.cartItems;
    }
    return { data: null, loading: false, error: null };
  }

  const {
    setProductsLoading,
    setProductsData,
    setProductsError,
    setCartItemsLoading,
    setCartItemsData,
    setCartItemsError,
  } = useDataContext();

  const depsChanged = useCallback(() => {
    const currentDeps = deps;
    const prevDeps = prevDepsRef.current;

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return true; // 첫 렌더링에서는 항상 true
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

    let setLoading: (loading: boolean) => void;
    let setData:
      | ((data: ResponseProduct[]) => void)
      | ((data: ResponseCartItem[]) => void);
    let setError: (error: string | null) => void;

    if (key === "products") {
      setLoading = setProductsLoading;
      setData = setProductsData;
      setError = setProductsError;
    } else if (key === "cart-items") {
      setLoading = setCartItemsLoading;
      setData = setCartItemsData;
      setError = setCartItemsError;
    } else {
      console.warn(`[useDataFetch] 알 수 없는 키: ${key}`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await fetcher();

      if (!isMountedRef.current) return;

      if (key === "products") {
        (setData as (data: ResponseProduct[]) => void)(
          result as ResponseProduct[]
        );
      } else if (key === "cart-items") {
        (setData as (data: ResponseCartItem[]) => void)(
          result as ResponseCartItem[]
        );
      }

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

      setError(errorMessage);
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

  const currentState = getCurrentState();

  return {
    data: currentState.data as T,
    loading: currentState.loading,
    error: currentState.error,
    refetch,
  };
}

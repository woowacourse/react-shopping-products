import { useContext, useEffect, useCallback } from "react";
import { DataContext } from "../contexts/DataContext";

interface UseDataOptions<T> {
  key: string;
  fetcher: () => Promise<T>;
  dependencies?: any[];
  enabled?: boolean;
}

export const useData = <T>({
  key,
  fetcher,
  dependencies = [],
  enabled = true,
}: UseDataOptions<T>) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData는 DataProvider 안에서만 사용할 수 있습니다.");
  }

  const { getState, setState, clearError } = context;
  const state = getState<T>(key);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setState(key, { isLoading: true, error: "" });

    try {
      const result = await fetcher();
      setState(key, { data: result, isLoading: false, error: "" });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      setState(key, { data: null, isLoading: false, error: errorMessage });
    }
  }, [key, fetcher, enabled, setState]);

  const setError = useCallback(
    (errorMessage: string) => {
      setState(key, { error: errorMessage });
    },
    [key, setState]
  );

  const clearErrorHandler = useCallback(() => {
    clearError(key);
  }, [key, clearError]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    refetch: fetchData,
    setError,
    clearError: clearErrorHandler,
  };
};

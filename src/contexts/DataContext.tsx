import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";

interface DataState<T = any> {
  data: T | null;
  isLoading: boolean;
  error: string;
}

interface DataContextType {
  getState: <T>(key: string) => DataState<T>;
  setState: <T>(key: string, state: Partial<DataState<T>>) => void;
  clearError: (key: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dataStore, setDataStore] = useState<Record<string, DataState>>({});

  const getState = useCallback(
    function <T>(key: string): DataState<T> {
      return dataStore[key] || { data: null, isLoading: false, error: "" };
    },
    [dataStore]
  );

  const setState = useCallback(function <T>(
    key: string,
    newState: Partial<DataState<T>>
  ) {
    setDataStore((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        data: newState.data ?? prev[key]?.data ?? null,
        isLoading: false,
        error: "",
        ...newState,
      },
    }));
  },
  []);

  const clearError = useCallback((key: string) => {
    setDataStore((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        error: "",
      },
    }));
  }, []);

  return (
    <DataContext.Provider value={{ getState, setState, clearError }}>
      {children}
    </DataContext.Provider>
  );
};

interface UseDataOptions<T> {
  key: string;
  fetcher: () => Promise<T>;
  enabled?: boolean;
}

export function useData<T>({
  key,
  fetcher,
  enabled = true,
}: UseDataOptions<T>) {
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

  const setError = (errorMessage: string) => {
    setState(key, { error: errorMessage });
  };

  const clearErrorHandler = () => {
    clearError(key);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    refetch: fetchData,
    setError,
    clearError: clearErrorHandler,
  };
}

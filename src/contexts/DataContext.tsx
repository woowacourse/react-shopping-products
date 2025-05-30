import { createContext, useState, ReactNode, useCallback } from "react";

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

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [dataStore, setDataStore] = useState<Record<string, DataState>>({});

  const getState = useCallback(
    <T,>(key: string): DataState<T> => {
      return dataStore[key] || { data: null, isLoading: false, error: "" };
    },
    [dataStore]
  );

  const setState = useCallback(
    <T,>(key: string, newState: Partial<DataState<T>>) => {
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
    []
  );

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

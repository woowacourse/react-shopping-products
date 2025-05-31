import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DataStateItem<T = unknown> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface DataState {
  [key: string]: DataStateItem;
}

interface DataContextType {
  state: DataState;
  fetchData: <T>(key: string, fetchFn: () => Promise<T>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DataState>({});

  const fetchData = async <T,>(key: string, fetchFn: () => Promise<T>) => {
    try {
      setState((prev) => ({
        ...prev,
        [key]: { data: prev[key]?.data || null, isLoading: true, error: null },
      }));

      const data = await fetchFn();

      setState((prev) => ({
        ...prev,
        [key]: { data, isLoading: false, error: null },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        [key]: {
          data: prev[key]?.data || null,
          isLoading: false,
          error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        },
      }));
    }
  };

  return <DataContext.Provider value={{ state, fetchData }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext는 DataProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

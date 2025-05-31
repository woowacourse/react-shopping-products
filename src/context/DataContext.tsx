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
  getTypedData: <T>(key: string) => DataStateItem<T>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DataState>({});

  const updateState = (key: string, newState: Partial<DataStateItem>) => {
    setState((prev) => {
      const currentState = prev[key] || { data: null, isLoading: false, error: null };
      return {
        ...prev,
        [key]: { ...currentState, ...newState },
      };
    });
  };

  const fetchData = async <T,>(key: string, fetchFn: () => Promise<T>) => {
    updateState(key, { isLoading: true, error: null });

    try {
      const data = await fetchFn();
      updateState(key, { data, isLoading: false });
    } catch (error) {
      updateState(key, {
        isLoading: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      });
    }
  };

  const getTypedData = <T,>(key: string): DataStateItem<T> => {
    const defaultState: DataStateItem<T> = { data: null, isLoading: false, error: null };
    return (state[key] as DataStateItem<T>) || defaultState;
  };

  return (
    <DataContext.Provider value={{ state, fetchData, getTypedData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext는 DataProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

import { createContext, useState, ReactNode, useCallback } from 'react';

interface ResourceState<T> {
  data: T | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}

type DataStore = Record<string, ResourceState<unknown>>;

interface DataContextType {
  store: DataStore;
  updateResource: <T>(key: string, updates: Partial<ResourceState<T>>) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<DataStore>({});

  const updateResource = useCallback(<T,>(key: string, updates: Partial<ResourceState<T>>) => {
    setStore((prevStore) => {
      const currentState = prevStore[key] || {
        data: null,
        isLoading: false,
        isFetching: false,
        isError: false,
      };

      return {
        ...prevStore,
        [key]: {
          ...currentState,
          ...updates,
        },
      };
    });
  }, []);

  return <DataContext.Provider value={{ store, updateResource }}>{children}</DataContext.Provider>;
};

import { createContext, useContext, useState, useCallback, ReactNode, useReducer } from 'react';

interface CacheData<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  lastFetchedAt: number | null;
}

interface DataContextType {
  cache: Map<string, CacheData<unknown>>;
  getCache: <T>(key: string) => CacheData<T> | undefined;
  setCache: <T>(key: string, data: CacheData<T>) => void;
  clearCache: (key?: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [cache] = useState(new Map<string, CacheData<unknown>>());
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const getCache = useCallback(
    <T,>(key: string): CacheData<T> | undefined => {
      return cache.get(key) as CacheData<T> | undefined;
    },
    [cache],
  );

  const setCache = useCallback(
    <T,>(key: string, data: CacheData<T>) => {
      cache.set(key, data as CacheData<unknown>);
      forceUpdate();
    },
    [cache],
  );

  const clearCache = useCallback(
    (key?: string) => {
      if (key) {
        cache.delete(key);
      } else {
        cache.clear();
      }
      forceUpdate();
    },
    [cache],
  );

  const value: DataContextType = {
    cache,
    getCache,
    setCache,
    clearCache,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

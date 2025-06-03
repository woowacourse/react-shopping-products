import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface CacheData<T = any> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  lastFetchedAt: number | null;
}

interface DataContextType {
  cache: Map<string, CacheData>;
  setCache: (key: string, data: CacheData) => void;
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
  const [cache] = useState(new Map<string, CacheData>());

  const setCache = useCallback(
    (key: string, data: CacheData) => {
      cache.set(key, data);
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
    },
    [cache],
  );

  const value: DataContextType = {
    cache,
    setCache,
    clearCache,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

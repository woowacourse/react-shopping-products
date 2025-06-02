import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import type { CacheKey } from '../utils/cacheKeys';

const DEFAULT_CACHE_EXPIRY = 5 * 60 * 1000;

export interface DataStateItem<T = unknown> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  timestamp?: number;
  expiresIn?: number;
}

type DataState = Partial<Record<CacheKey, DataStateItem>>;

interface CacheOptions {
  expiresIn?: number;
  forceRefresh?: boolean;
}

interface DataContextType {
  state: DataState;
  fetchData: <T>(key: CacheKey, fetchFn: () => Promise<T>, options?: CacheOptions) => Promise<void>;
  getTypedData: <T>(key: CacheKey) => DataStateItem<T>;
  invalidateCache: (key: CacheKey) => void;
  clearAllCache: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DataState>({});

  const pendingRequests = useRef<Map<CacheKey, Promise<unknown>>>(new Map());

  const updateState = (key: CacheKey, newState: Partial<DataStateItem>) => {
    setState((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...newState },
    }));
  };

  const isCacheValid = (key: CacheKey): boolean => {
    const cached = state[key];
    if (!cached?.data || !cached.timestamp) return false;

    const expiresIn = cached.expiresIn || DEFAULT_CACHE_EXPIRY;
    return Date.now() - cached.timestamp < expiresIn;
  };

  const invalidateCache = (key: CacheKey) => {
    setState((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
    pendingRequests.current.delete(key);
  };

  const clearAllCache = () => {
    setState({});
    pendingRequests.current.clear();
  };

  const fetchData = async <T,>(
    key: CacheKey,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {},
  ) => {
    const { expiresIn = DEFAULT_CACHE_EXPIRY, forceRefresh = false } = options;

    if (!forceRefresh && isCacheValid(key)) {
      if (process.env.NODE_ENV === 'development') console.log(`${key} 캐시 유효`);
      return;
    }

    const existingRequest = pendingRequests.current.get(key);
    if (existingRequest) {
      if (process.env.NODE_ENV === 'development') console.log(`${key} 이미 요청 중`);
      await existingRequest;
      return;
    }

    if (process.env.NODE_ENV === 'development') console.log(`${key} 새로운 요청 시작`);
    updateState(key, { isLoading: true, error: null });

    const requestPromise = fetchFn();
    pendingRequests.current.set(key, requestPromise);

    try {
      const data = await requestPromise;
      updateState(key, {
        data,
        isLoading: false,
        timestamp: Date.now(),
        expiresIn,
      });
      if (process.env.NODE_ENV === 'development') console.log(`${key} 요청 완료`);
    } catch (error) {
      updateState(key, {
        isLoading: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      });
    } finally {
      pendingRequests.current.delete(key);
    }
  };

  const getTypedData = <T,>(key: CacheKey): DataStateItem<T> => {
    return (state[key] as DataStateItem<T>) || { data: null, isLoading: false, error: null };
  };

  return (
    <DataContext.Provider
      value={{
        state,
        fetchData,
        getTypedData,
        invalidateCache,
        clearAllCache,
      }}
    >
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

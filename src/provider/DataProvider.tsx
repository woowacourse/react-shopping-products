import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface CacheItem<T> {
  data: T;
  updatedAt: number;
  loading: boolean;
}

interface DataContextType {
  getData: <T>(key: string) => T | undefined;
  fetchData: <T>(
    key: string,
    fetchFn: () => Promise<T>,
    options?: { cacheTime?: number }
  ) => Promise<void>;
  refetch: <T>(key: string, fetchFn: () => Promise<T>) => Promise<void>;
  loading: (key: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState<Record<string, CacheItem<unknown>>>({});

  const fetchData = useCallback(
    async function <T>(
      key: string,
      fetchFn: () => Promise<T>,
      options: { cacheTime?: number } = {}
    ): Promise<void> {
      const now = Date.now();
      const cacheTime = options.cacheTime ?? DEFAULT_CACHE_TIME;
      const existing = cache[key];

      if (existing && now - existing.updatedAt < cacheTime) return;

      setCache((prev) => ({
        ...prev,
        [key]: {
          data: prev[key]?.data ?? undefined,
          updatedAt: now,
          loading: true,
        },
      }));

      try {
        const data = await fetchFn();
        setCache((prev) => ({
          ...prev,
          [key]: {
            data,
            updatedAt: Date.now(),
            loading: false,
          },
        }));
      } catch (error) {
        setCache((prev) => ({
          ...prev,
          [key]: {
            data: undefined,
            updatedAt: Date.now(),
            loading: false,
          },
        }));
      }
    },
    [cache]
  );

  const refetch = useCallback(async function <T>(
    key: string,
    fetchFn: () => Promise<T>
  ): Promise<void> {
    setCache((prev) => ({
      ...prev,
      [key]: {
        data: prev[key]?.data ?? undefined,
        updatedAt: Date.now(),
        loading: true,
      },
    }));

    try {
      const data = await fetchFn();
      setCache((prev) => ({
        ...prev,
        [key]: {
          data,
          updatedAt: Date.now(),
          loading: false,
        },
      }));
    } catch (error) {
      setCache((prev) => ({
        ...prev,
        [key]: {
          data: undefined,
          updatedAt: Date.now(),
          loading: false,
        },
      }));
    }
  },
  []);

  const getData = useCallback(
    <T,>(key: string): T | undefined => {
      return cache[key]?.data as T | undefined;
    },
    [cache]
  );

  const loading = (key: string) => cache[key]?.loading ?? false;

  return (
    <DataContext.Provider value={{ getData, fetchData, refetch, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

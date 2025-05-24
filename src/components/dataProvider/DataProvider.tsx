import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext<{
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}>({
  data: {},
  setData: () => {},
});

export function DataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData<T>({
  fetchFn,
  key,
}: {
  fetchFn: () => Promise<T>;
  key: string;
}) {
  const { data, setData } = useContext(DataContext);

  const request = useCallback(() => {
    fetchFn().then((res) => {
      setData((prev) => {
        return { ...prev, [key]: res };
      });
    });
  }, [fetchFn, setData, key]);

  useEffect(() => {
    const hasData = data[key];
    if (hasData) {
      return;
    }
    request();
  }, [data, request, key]);

  return { data: data[key] as T, reFetcher: request };
}

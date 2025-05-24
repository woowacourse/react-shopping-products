import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

type DataStatus = Record<string, Status>;

const Context = createContext<{
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}>({
  data: {},
  setData: () => {},
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState({});

  return (
    <Context.Provider
      value={{
        data,
        setData: setData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

interface APIContextProps<T> {
  apiFn: () => Promise<T>;
  key: string;
}

export function useAPIContext<T>({ apiFn, key }: APIContextProps<T>) {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('ususeAPIContext must be used within a Provider');
  }

  const { data, setData } = context as {
    data: Record<string, T>;
    setData: React.Dispatch<React.SetStateAction<Record<string, T>>>;
  };
  const [status, setStatus] = useState<DataStatus>({});

  const requestData = useCallback(async () => {
    apiFn()
      .then((res) => {
        setStatus((prev) => ({ ...prev, [key]: 'loading' }));
        setData((prev) => ({ ...prev, [key]: res }));
        setStatus((prev) => ({ ...prev, [key]: 'success' }));
      })
      .catch(() => {
        setStatus((prev) => ({ ...prev, [key]: 'error' }));
      });
  }, [apiFn, key, setData]);

  useEffect(() => {
    if (data[key]) return;

    requestData();
  }, [key]);

  return {
    data: data[key],
    refetchData: requestData,
    status: status[key],
  };
}

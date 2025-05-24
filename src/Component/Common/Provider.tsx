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
  apiFn?: () => Promise<T>;
  key: string;
}

export function useAPIContext<T>({ apiFn, key }: APIContextProps<T>) {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useAPIContext must be used within a Provider');
  }

  const { data, setData } = context as {
    data: Record<string, T>;
    setData: React.Dispatch<React.SetStateAction<Record<string, T>>>;
  };
  const [status, setStatus] = useState<DataStatus>({});

  const requestData = useCallback(async () => {
    if (!apiFn) return;

    try {
      setStatus((prev) => ({ ...prev, [key]: 'loading' }));
      const fetchedData = await apiFn();
      setData((prev) => ({ ...prev, [key]: fetchedData }));
      setStatus((prev) => ({ ...prev, [key]: 'success' }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, [key]: 'error' }));
    }
  }, [apiFn, key, setData]);

  const newRequestData = useCallback(
    async ({ apiFn }: { apiFn: () => Promise<T> }) => {
      try {
        setStatus((prev) => ({ ...prev, [key]: 'loading' }));
        const fetchedData = await apiFn();
        setData((prev) => ({ ...prev, [key]: fetchedData }));
        setStatus((prev) => ({ ...prev, [key]: 'success' }));
      } catch (error) {
        setStatus((prev) => ({ ...prev, [key]: 'error' }));
      }
    },
    [key, setData]
  );

  useEffect(() => {
    if (data[key]) return;

    requestData();
  }, [requestData, key]);

  return {
    data: data[key],
    refetchData: requestData,
    requestData: newRequestData,
    status: status[key],
  };
}

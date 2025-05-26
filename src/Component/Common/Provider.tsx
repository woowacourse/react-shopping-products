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
  status: Record<string, Status>;
  setStatus: React.Dispatch<React.SetStateAction<Record<string, Status>>>;
}>({
  data: {},
  setData: () => {},
  status: {},
  setStatus: () => {},
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState<DataStatus>({});

  return (
    <Context.Provider
      value={{
        data,
        setData: setData,
        status,
        setStatus,
      }}
    >
      {children}
    </Context.Provider>
  );
}

interface APIContextProps<T> {
  apiFn?: () => Promise<T>;
  key: string;
  skipLoading?: boolean;
}

export function useAPIContext<T>({
  apiFn,
  key,
  skipLoading,
}: APIContextProps<T>) {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useAPIContext must be used within a Provider');
  }

  const { data, setData, status, setStatus } = context as {
    data: Record<string, T>;
    setData: React.Dispatch<React.SetStateAction<Record<string, T>>>;
    status: Record<string, Status>;
    setStatus: React.Dispatch<React.SetStateAction<Record<string, Status>>>;
  };

  const requestData = useCallback(
    async (override?: { apiFn: () => Promise<T>; skipLoading?: boolean }) => {
      const fn = override?.apiFn ?? apiFn;
      const skip = override?.skipLoading ?? skipLoading;
      if (!fn) return;

      try {
        if (!skip) {
          setStatus((prev) => ({ ...prev, [key]: 'loading' }));
        }
        const fetchedData = await fn();
        setData((prev) => ({ ...prev, [key]: fetchedData }));
        setStatus((prev) => ({ ...prev, [key]: 'success' }));
      } catch {
        setStatus((prev) => ({ ...prev, [key]: 'error' }));
      }
    },
    [skipLoading, setData, setStatus, key]
  );

  useEffect(() => {
    if (data[key] || !apiFn) return;

    requestData();
  }, []);

  return {
    data: data[key],
    refetchData: () => requestData(),
    requestData: requestData,
    status: status[key],
  };
}

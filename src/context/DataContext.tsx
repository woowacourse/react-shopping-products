import { createContext, useCallback, useState } from "react";

interface DataContextProps {
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  isLoading: Record<string, unknown>;
  setIsLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  error: Record<string, string | null>;
  setError: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
  refetchFunctions: Record<string, () => Promise<void>>;
  setRefetchFunction: (name: string, refetchFn: () => Promise<void>) => void;
}

export const DataContext = createContext<DataContextProps | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string | null>>({});
  const [refetchFunctions, setRefetchFunctions] = useState<
    Record<string, () => Promise<void>>
  >({});

  const setRefetchFunction = useCallback(
    (name: string, refetchFn: () => Promise<void>) => {
      setRefetchFunctions((prev) => ({ ...prev, [name]: refetchFn }));
    },
    []
  );

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        isLoading,
        setIsLoading,
        error,
        setError,
        refetchFunctions,
        setRefetchFunction,
        // error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

import { createContext, useState } from "react";

interface DataContextProps {
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  isLoading: Record<string, unknown>;
  setIsLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  //   error: string | null;
}

export const DataContext = createContext<DataContextProps | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  //   const [error, setError] = useState<string | null>(null);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        isLoading,
        setIsLoading,
        // error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

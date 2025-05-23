import { createContext, SetStateAction, useState } from 'react';

interface DataContextProps {
  children: React.ReactNode;
}

interface DataContextType {
  data: Map<string, unknown>;
  setData: React.Dispatch<SetStateAction<Map<string, unknown>>>;
  isLoading: Map<string, boolean>;
  setIsLoading: React.Dispatch<SetStateAction<Map<string, boolean>>>;
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: DataContextProps) => {
  const [data, setData] = useState<Map<string, unknown>>(new Map());
  const [isLoading, setIsLoading] = useState<Map<string, boolean>>(new Map());

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

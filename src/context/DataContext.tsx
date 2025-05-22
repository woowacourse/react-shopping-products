import { createContext, SetStateAction, useState } from 'react';

interface DataContextProps {
  children: React.ReactNode;
}

interface DataContextType {
  data: Map<string, unknown>;
  setData: React.Dispatch<SetStateAction<Map<string, unknown>>>;
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: DataContextProps) => {
  const [data, setData] = useState<Map<string, unknown>>(new Map());

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

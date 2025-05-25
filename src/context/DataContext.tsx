import { createContext, SetStateAction, useCallback, useState } from 'react';

interface DataContextProps {
  children: React.ReactNode;
}

interface DataContextType {
  data: Map<string, unknown>;
  setData: React.Dispatch<SetStateAction<Map<string, unknown>>>;
  isLoading: Map<string, boolean>;
  handleLoading: (dataLoading: boolean, dataName: string) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<SetStateAction<string>>;
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: DataContextProps) => {
  const [data, setData] = useState<Map<string, unknown>>(new Map());
  const [isLoading, setIsLoading] = useState<Map<string, boolean>>(new Map());

  const [errorMessage, setErrorMessage] = useState('');

  const handleLoading = useCallback((dataLoading: boolean, dataName: string) => {
    setIsLoading((prev) => new Map(prev).set(dataName, dataLoading));
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        isLoading,
        handleLoading,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

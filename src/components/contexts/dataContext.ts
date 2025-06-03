import { createContext, useContext } from 'react';

type DataContextValue = {
  data: Record<string, any>;
  setData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export const DataContext = createContext<DataContextValue | null>(null);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('DataProvider 안에서 사용되어야 합니다.');
  }
  return context;
};

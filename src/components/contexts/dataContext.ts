import { createContext, useContext } from 'react';
import { CartItem, Product } from '../../App';

type DataContextValue<T> = {
  data: Record<string, T>;
  setData: React.Dispatch<React.SetStateAction<Record<string, T>>>;
};

export function createDataContext<T>() {
  const DataContext = createContext<DataContextValue<T> | null>(null);

  const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error('DataProvider 안에서 사용되어야 합니다.');
    }
    return context;
  };

  return { DataContext, useDataContext };
}

type DataStore = {
  products: { data: Product[] };
  cartItems: { data: CartItem[] };
};

export const { DataContext, useDataContext } = createDataContext<DataStore>();

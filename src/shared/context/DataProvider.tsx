import { createContext, PropsWithChildren } from 'react';

import { getCartItemList } from '@/api/cart';
import { getProductList } from '@/api/product';
import { CartItem } from '@/features/ProductList/types/Cart';
import { Product } from '@/features/ProductList/types/Product';

import { useFetchData } from '../hooks/useFetchData';

type DataMap = {
  productData: Product[];
  cartData: CartItem[];
};

type UseDataReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetch: (apiCall: () => Promise<T>) => Promise<void>;
  mutate: (apiCall: () => Promise<void>, refetchFn?: () => Promise<T>) => Promise<void>;
};

type DataContextType = {
  [K in keyof DataMap]: UseDataReturn<DataMap[K]>;
};

export const DataContext = createContext<DataContextType>({
  productData: {
    data: null,
    isLoading: false,
    error: null,
    fetch: async () => {},
    mutate: async () => {},
  },
  cartData: {
    data: null,
    isLoading: false,
    error: null,
    fetch: async () => {},
    mutate: async () => {},
  },
});

export const DataProvider = ({ children }: PropsWithChildren) => {
  const productData = useFetchData<Product[]>({
    autoFetch: getProductList,
  });
  const cartData = useFetchData<CartItem[]>({
    autoFetch: getCartItemList,
  });

  return <DataContext.Provider value={{ productData, cartData }}>{children}</DataContext.Provider>;
};

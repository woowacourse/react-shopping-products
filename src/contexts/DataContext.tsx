import { createContext, ReactNode, useMemo, useState } from 'react';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import { getMergedData } from '../utils';

interface DataContext {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  cartLength: number;
  mergedData: {
    cartInfo: {
      id: number;
      quantity: number;
    };
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    quantity: number;
  }[];
  productsLoading: boolean;
  handleCartProducts: (
    keyword: 'add' | 'remove' | 'patch',
    options: {
      id: number;
      quantity?: number;
    }
  ) => Promise<void>;
  cartLoading: boolean;
}

export const DataContext = createContext<DataContext>({
  filter: '',
  setFilter: () => {},
  sort: '',
  setSort: () => {},
  cartLength: 0,
  mergedData: [],
  productsLoading: false,
  handleCartProducts: async () => {},
  cartLoading: false,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const { products, loading: productsLoading } = useProducts({
    filterType: filter,
    sortingType: sort,
  });
  const { cartProducts, handleCartProducts, loading: cartLoading } = useCart();

  const cartLength = cartProducts.length;
  const mergedData = useMemo(() => getMergedData(products, cartProducts), [products, cartProducts]);

  const contextValue = {
    filter,
    setFilter,
    sort,
    setSort,
    cartLength,
    mergedData,
    productsLoading,
    handleCartProducts,
    cartLoading,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
}

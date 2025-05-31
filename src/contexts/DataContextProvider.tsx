import React, {
  createContext,
  useReducer,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import { CartItem } from '../components/ShoppingCartModal/cart.type';
import { Product } from '../components/ProductCardList/product.type';
import { dataReducer } from './dataReducer';

import { DataContextType } from './data.type';

export const DataContext = createContext<DataContextType | null>(null);

const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    products: {
      data: [],
      loading: false,
      error: '',
      category: '전체',
      sort: 'price,asc',
    },
    'cart-items': {
      data: [],
      loading: false,
      error: '',
    },
  });

  const setData = useCallback((key: string, data: CartItem[] | Product[]) => {
    dispatch({ type: 'SET_DATA', key, data });
  }, []);

  const setLoading = useCallback((key: string, loading: boolean) => {
    dispatch({ type: 'SET_LOADING', key, loading });
  }, []);

  const setError = useCallback((key: string, error: string) => {
    dispatch({ type: 'SET_ERROR', key, error });
  }, []);

  const clearError = useCallback((key: string) => {
    dispatch({ type: 'CLEAR_ERROR', key });
  }, []);

  const setCategory = useCallback((category: string) => {
    dispatch({ type: 'SET_CATEGORY', key: 'products', category });
  }, []);

  const setSort = useCallback((sort: string) => {
    dispatch({ type: 'SET_SORT', key: 'products', sort });
  }, []);

  const value = useMemo(
    () => ({
      state,
      setData,
      setLoading,
      setError,
      clearError,
      setCategory,
      setSort,
    }),
    [state, setData, setLoading, setError, clearError, setCategory, setSort]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;

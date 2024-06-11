import React, { createContext, PropsWithChildren } from 'react';
import { fetchItems } from '../api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { CartItem } from '../type/CartItem';
export const CartContext = createContext<{
  isLoading: boolean;
  error: Error | null;
  cartItems: CartItem[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
}>({
  isLoading: false,
  error: null,
  cartItems: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  refetch: () => {},
});

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } =
    useQuery({
      queryKey: [QUERY_KEYS.CART_ITEM],
      queryFn: fetchItems,
      initialData: [],
      placeholderData: keepPreviousData,
    });

  return (
    <CartContext.Provider
      value={{
        isLoading,
        error,
        cartItems: data,
        isFetching,
        isSuccess,
        isError,
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

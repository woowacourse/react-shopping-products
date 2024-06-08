import React, { createContext, useEffect, PropsWithChildren } from 'react';
import { fetchItems } from '../api';
import { useToast } from '../hooks/useToast';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { CartItems } from '../type/CartItem';
export const CartContext = createContext<{
  isLoading: boolean;
  error: Error | null;
  cartItem: CartItems[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
}>({
  isLoading: false,
  error: null,
  cartItem: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  refetch: () => {},
});

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { createToast } = useToast();
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } =
    useQuery({
      queryKey: [QUERY_KEYS.CART_ITEM],
      queryFn: fetchItems,
      initialData: [],
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (error) {
      if (error instanceof Error) {
        createToast(
          '⛔️ 장바구니 수량을 가져오는데 실패했습니다. 다시 시도해 주세요.',
        );
      }
    }
  }, [error, createToast]);
  return (
    <CartContext.Provider
      value={{
        isLoading,
        error,
        cartItem: data,
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

import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { fetchShoppingCartQuantity } from '../api';
import { useToast } from '../hooks/useToast';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
export const CartContext = createContext<{
  isLoading: boolean;
  error: Error | null;
  counts: number;
  setCounts: React.Dispatch<React.SetStateAction<number>>;
  refetch: () => void;
}>({
  isLoading: false,
  error: null,
  counts: 0,
  setCounts: () => {},
  refetch: () => {},
});

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { createToast } = useToast();
  const [counts, setCounts] = useState(0);

  const { data, error, refetch, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.CART_ITEM_COUNT],
    queryFn: fetchShoppingCartQuantity,
  });

  useEffect(() => {
    if (isSuccess) {
      setCounts(data);
    }
  }, [data, setCounts, isSuccess]);
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
      value={{ isLoading, error, counts, setCounts, refetch }}
    >
      {children}
    </CartContext.Provider>
  );
};

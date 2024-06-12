import { fetchItems } from '../api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { CartItem } from '../type/CartItem';

interface UseCartItemResult {
  isLoading: boolean;
  cartItems: CartItem[];
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
}
export function useCartItem(enabled: boolean = true): UseCartItemResult {
  const { data, isLoading, isFetching, isSuccess, isError, refetch } = useQuery(
    {
      queryKey: [QUERY_KEYS.CART_ITEM],
      queryFn: fetchItems,
      initialData: [],
      placeholderData: keepPreviousData,
      enabled,
    },
  );

  return {
    cartItems: data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
  };
}

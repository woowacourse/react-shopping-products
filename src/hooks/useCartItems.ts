import { fetchCartItem } from '../api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constant/queryKeys';

export function useCartItems() {
  const { data, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: () => fetchCartItem(0, 100),
  });

  return { cartItems: data ?? [], isError, isLoading };
}

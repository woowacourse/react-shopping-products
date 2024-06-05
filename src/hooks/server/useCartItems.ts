import { CartItem, getCartItems } from "@src/apis/cartItems";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../__constants__/queryKeys";

interface UseCartItemsReturn {
  data: CartItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<CartItem[], Error>>;
}

export const useCartItems = (): UseCartItemsReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: data ?? [],
    isLoading,
    error,
    refetch,
  };
};

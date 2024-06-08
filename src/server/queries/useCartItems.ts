import { CartItem, getCartItems } from "@src/apis/cartItems";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@server/__constants__/queryKeys";

interface UseCartItemsReturn {
  data: CartItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<CartItem[], Error>>;
}

export const useCartItems = (): UseCartItemsReturn => {
  const queryResult = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: getCartItems,
  });

  return {
    ...queryResult,
    data: queryResult.data ?? [],
  };
};

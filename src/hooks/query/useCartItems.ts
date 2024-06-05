import { CartItem, getCartItems } from "@src/apis/cartItems";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../__constants__/queryKeys";

interface UseCartItemsReturn {
  cartItems: CartItem[];
  isLoading: boolean;
  error: Error | null;
  refreshCartItems: () => Promise<void>;
}

export const useCartItems = (): UseCartItemsReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: getCartItems,
  });

  const refreshCartItems = async () => {
    await refetch();
  };

  return {
    cartItems: data ?? [],
    isLoading: isLoading,
    error,
    refreshCartItems,
  };
};

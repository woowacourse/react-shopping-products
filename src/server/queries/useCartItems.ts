import { CartItem, getCartItems } from "@src/apis/cartItems";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@server/__constants__/queryKeys";
import { useEffect } from "react";

interface UseCartItemsReturn {
  data: CartItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<CartItem[], Error>>;
}

type OnError = (error: Error) => void;

export const useCartItems = (onError?: OnError): UseCartItemsReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: getCartItems,
  });

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error]);

  return {
    data: data ?? [],
    isLoading,
    error,
    refetch,
  };
};

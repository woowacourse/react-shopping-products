import { CartItem } from "./../../api/cartItems";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryKeys";
import { getCartItems } from "./../../api/cartItems";

interface UseCartItemsReturn {
  cartItems: CartItem[] | undefined;
  isLoading: boolean;
  errorMessage: string;
}

const useCartItems = (): UseCartItemsReturn => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.cartItems],
    queryFn: getCartItems,
    select: (response) => response.data,
  });

  return {
    cartItems: data ?? [],
    isLoading,
    errorMessage: error ? error.message : "",
  };
};

export default useCartItems;

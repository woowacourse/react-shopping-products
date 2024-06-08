import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../api";
import { QUERY_KEYS } from "../constants/queryKeys";

const useCartItemsQuery = () => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.getCartItems],
    queryFn: () => getCartItems(),
  });

  return { ...result, cartItems: result.data ?? [] };
};

export default useCartItemsQuery;

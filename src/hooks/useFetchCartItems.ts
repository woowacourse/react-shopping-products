import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../api/cart";
import { QUERY_KEYS } from "../constants";

export const useFetchCartItems = () => {
  const { data: cartItems, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: () => getCartItems(),
    initialData: [],
  });

  return { cartItems, ...rest };
};

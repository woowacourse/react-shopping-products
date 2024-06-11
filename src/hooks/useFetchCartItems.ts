import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../api/cart";
import { CART_KEYS } from "../constants";

export const useFetchCartItems = () => {
  const { data: cartItems, ...rest } = useQuery({
    queryKey: [CART_KEYS.CART],
    queryFn: () => getCartItems(),
    initialData: [],
  });

  return { cartItems, ...rest };
};

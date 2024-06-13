import { useQuery } from "@tanstack/react-query";

import { fetchCartItem } from "../../apis/cart-item";

import { QUERY_KEYS } from "../../constants/queries";

export default function useCartQuery() {
  return useQuery({
    queryFn: fetchCartItem,
    queryKey: [QUERY_KEYS.cartItems],
    retry: false,
  });
}

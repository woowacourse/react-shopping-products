import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../../apis";
import { QUERY_KEYS } from "../../../constants";

export default function useGetCartItems() {
  return useQuery({
    queryKey: [QUERY_KEYS.CART_ITEMS],
    queryFn: getCartItems,
  });
}

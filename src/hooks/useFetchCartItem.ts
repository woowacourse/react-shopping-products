import { useQuery } from "@tanstack/react-query";
import { requestFetchCartItemList } from "../apis/cartItems";

import { QUERY_KEYS } from "../constants/queryKeys";

export default function useFetchCartItem() {
  const fetchCartItemList = useQuery({
    queryKey: [QUERY_KEYS.cartItemList],
    queryFn: () => requestFetchCartItemList(),
    staleTime: Infinity,
  });

  return {
    fetchCartItemList,
    cartItemList: fetchCartItemList.data?.content,
    fetchError: fetchCartItemList.error,
  };
}

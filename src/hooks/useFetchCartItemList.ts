import { useQuery } from "@tanstack/react-query";
import { requestFetchCartItemList } from "../apis/cartItems";

export default function useFetchCartItemList() {
  const cartItemListQuery = useQuery({
    queryKey: ["cartItemList"],
    queryFn: () => requestFetchCartItemList(),
  });

  return {
    cartItemListQuery,
  };
}

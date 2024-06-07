import { useQuery } from "@tanstack/react-query";
import { requestFetchCartItemList } from "../apis/cartItems";

export default function useFetchCartItemList() {
  return useQuery({
    queryKey: ["cartItemList"],
    queryFn: () => requestFetchCartItemList(),
  });
}

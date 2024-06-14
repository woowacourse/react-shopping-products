import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../api/cart";
import { QUERY_KEYS } from "../constants/queryKeys";

const useGetCartItems = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartItems,
    initialData: [],
  });
};

export default useGetCartItems;

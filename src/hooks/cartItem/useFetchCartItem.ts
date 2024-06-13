import { QUERY_KEYS } from "../../constants/queryKeys";
import { getCartItems } from "../../api/cartItems";
import { useQuery } from "@tanstack/react-query";

const useFetchCartItem = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CART_ITEMS],
    queryFn: async () => {
      const prevData = await getCartItems();
      const size = prevData.totalElements;
      return getCartItems(size);
    },
  });
};

export default useFetchCartItem;

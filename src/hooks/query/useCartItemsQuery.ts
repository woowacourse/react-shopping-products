import { CartItemApi } from "@/apis";
import { useQuery } from "@/modules";

export default function useCartItemsQuery() {
  return useQuery({
    queryKey: "cartItems",
    queryFn: CartItemApi.getCartItems,
  });
}

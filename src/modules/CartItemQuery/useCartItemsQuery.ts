import { CartItemApi } from "@/apis";
import { useQuery } from "@/modules";

export function useCartItemsQuery() {
  return useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: "cartItems",
  });
}

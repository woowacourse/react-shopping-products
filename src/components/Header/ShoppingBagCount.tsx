import { useQuery } from "@/modules";
import { CartItemApi } from "@/apis";
import * as S from "./ShoppingBagCount.styles";

export default function ShoppingBagCount() {
  const { data: cartItems, status: cartItemsStatus } = useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: "cartItems",
  });

  const shoppingCount = cartItems?.content?.length ?? 0;

  if (cartItemsStatus === "loading") return null;
  if (cartItemsStatus === "error") return null;
  return <S.ShoppingBagCount>{shoppingCount}</S.ShoppingBagCount>;
}

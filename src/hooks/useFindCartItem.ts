import { useQuery } from "@tanstack/react-query";
import { ICartItem } from "../types/cartItems";
import { getCartItems } from "../api/cartItems";
import QUERY_KEYS from "../constants/queryKeys";

interface UseFindCartItemByCartId {
  cartId: number;
}

interface UseFindCartItemByProductId {
  productId: number;
}

const useFindCartItem = (props: UseFindCartItemByCartId | UseFindCartItemByProductId): ICartItem | undefined => {
  const { data: cartItems } = useQuery<ICartItem[]>({ queryKey: [QUERY_KEYS.cartItem], queryFn: getCartItems });

  if ("cartId" in props) {
    return cartItems?.find((it) => it.id === props.cartId);
  }

  if ("productId" in props) {
    return cartItems?.find((it) => it.product.id === props.productId);
  }
};

export default useFindCartItem;

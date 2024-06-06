import { useQuery } from "@tanstack/react-query";
import { CartItemType } from "../types/cartItems";
import { getCartItems } from "../api/cartItems";

interface UseFindCartItemProps {
  cartId?: number;
  productId?: number;
}

const useFindCartItem = ({ cartId, productId }: UseFindCartItemProps): CartItemType | undefined => {
  const { data: cartItems } = useQuery<CartItemType[]>({ queryKey: ["cartItems"], queryFn: getCartItems });

  const item1 = cartItems?.find((it) => it.id === cartId);
  if (cartId && item1) {
    return item1;
  }

  const item2 = cartItems?.find((it) => it.product.id === productId);
  if (productId && item2) {
    return item2;
  }
};

export default useFindCartItem;

import { CartItem } from "@src/apis/cartItems";
import { useCartItems } from "../queries/useCartItems";

interface UseCartAmountReturn {
  cartAmount: number;
}

export const useCartAmount = (): UseCartAmountReturn => {
  const { data: cartItems } = useCartItems();

  const cartAmount = calculateCartAmount(cartItems);

  return { cartAmount };
};

const calculateCartAmount = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
};

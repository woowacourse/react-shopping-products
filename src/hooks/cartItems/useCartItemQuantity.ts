import { useGetCartItems, useUpdateCartItem } from "./queries";
import { updateCartItemQuantity } from "../../apis";
import { UpdateCartItemQuantityProps } from "../../types";
import { ERROR_MESSAGE } from "../../constants";

interface UseCartItemQuantityResult {
  getQuantity: (productId: number) => number;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
}

export default function useCartItemQuantity(): UseCartItemQuantityResult {
  const { data: cartItems = [] } = useGetCartItems();

  const updateProductQuantity =
    useUpdateCartItem<UpdateCartItemQuantityProps>(updateCartItemQuantity);

  const getQuantity = (productId: number) => {
    const targetCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);
    return targetCartItem ? targetCartItem.quantity : 0;
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    const targetCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);

    if (!targetCartItem) {
      throw new Error(ERROR_MESSAGE.CART_ITEMS.ITEM_NOT_FOUND);
    }

    updateProductQuantity.mutate({ cartItemId: targetCartItem.id, quantity });
  };

  return {
    getQuantity,
    updateQuantity,
  };
}

import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { getCartItems } from "./getCartItems";

export const updateItemAndGetCart = async (
  updateCartItem: () => Promise<void>
): Promise<CartItemType[]> => {
  await updateCartItem();
  return getCartItems();
};

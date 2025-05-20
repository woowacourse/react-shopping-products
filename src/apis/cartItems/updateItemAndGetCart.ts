import { CartItemType } from "@/types/cartItem";
import { getCartItems } from "./getCartItems";

export const updateItemAndGetCart = async (
  updateCartItem: () => Promise<void>
): Promise<CartItemType[]> => {
  await updateCartItem();
  return getCartItems();
};

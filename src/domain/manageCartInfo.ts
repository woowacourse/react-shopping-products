import type { CartItemType } from '../types/data';

export const getCartId = async (cartItems: CartItemType[], productId: number) => {
  const cartItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  return cartItem?.id;
};

import type { CartItemType } from '../types/data';

export const getCartInCount = (cartItems: CartItemType[], productId: number) => {
  const cartItem = cartItems.find((cartItem) => cartItem.product.id === productId);
  return cartItem ? cartItem.quantity : 0;
};

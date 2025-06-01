import type { CartItemType } from '../types/data';

export const getCountInCart = (cartItems: CartItemType[], productId: number) => {
  const cartItem = cartItems.find((cartItem) => cartItem.product.id === productId);
  return cartItem ? cartItem.quantity : 0;
};

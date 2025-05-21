import type { CartItemType } from '../types/data';

// TODO : 유틸 함수로 이동

export const getCartId = async (cartItems: CartItemType[], productId: number) => {
  const cartItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  return cartItem?.id;
};

export const getCartInCount = (cartItems: CartItemType[], productId: number) => {
  const cartItem = cartItems.find((cartItem) => cartItem.product.id === productId);
  return cartItem ? cartItem.quantity : 0;
};

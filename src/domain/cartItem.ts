import { CartItemType } from '../types/data';

export const getCartId = (cartItems: CartItemType[], productId: number) => {
  const targetItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  return targetItem?.id;
};

export const extractCartQuantity = (cartItems: CartItemType[], productId: number) => {
  const targetItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  return targetItem ? targetItem.quantity : 0;
};

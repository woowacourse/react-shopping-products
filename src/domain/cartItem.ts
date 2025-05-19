import { CartItemType } from '../types/data';

export const getCartId = async (cartItems: CartItemType[], productId: number) => {
  const targetItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  return targetItem && targetItem.id;
};

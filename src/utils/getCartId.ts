import { CartItem } from '../types/type';

export const getCartId = (cartList: CartItem[], productId: number): number => {
  const item = cartList.filter((cartItem) => cartItem.product.id === productId);
  return item[0].id;
};

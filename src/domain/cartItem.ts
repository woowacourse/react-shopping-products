import { CartItemType } from '../types/data';

export const getCartId = (cartItems: CartItemType[], productId: number) => {
  const targetItem = cartItems.find((item: CartItemType) => item.product.id === productId);
  return targetItem?.id;
};

export const checkIsProductInCart = (cartItems: CartItemType[], productId: number) => {
  const cartItemsIds = cartItems.map(({ product }) => product.id);
  return cartItemsIds.includes(productId);
};

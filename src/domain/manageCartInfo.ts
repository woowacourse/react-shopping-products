import { getCartItems } from '../services/cartItemServices';
import { CartItemType } from '../types/data';

export const isCartItem = (productId: number, cartItems: CartItemType[]) => {
  return cartItems.some((item: CartItemType) => item.product.id === productId);
};

export const getCartId = async (productId: number) => {
  const data = await getCartItems();
  const cartItem = data.find((item: CartItemType) => item.product.id === productId);
  return cartItem && cartItem.id;
};

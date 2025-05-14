import { getCartItems } from '../services/cartItemServices';
import { CartItemType } from '../types/data';

export const isCartItem = async (productId: number) => {
  const data = await getCartItems();
  return data.some((item: CartItemType) => item.product.id === productId);
};

export const getCartId = async (productId: number) => {
  const data = await getCartItems();
  const cartItem = data.find((item: CartItemType) => item.product.id === productId);
  console.log(cartItem);
  console.log(productId);
  return cartItem && cartItem.id;
};

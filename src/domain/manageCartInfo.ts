import { getCartItems } from '../services/cartItemServices';
import { CartItemType } from '../types/data';

export const getCartId = async (productId: number) => {
  const data = await getCartItems();
  const cartItem = data.find((item: CartItemType) => item.product.id === productId);
  return cartItem && cartItem.id;
};

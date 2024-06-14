import { Carts } from '../types/fetch';

const getCartItemByProduct = (cartItems: Carts[], productId: number) => {
  return cartItems.find((item) => item.product.id === productId) ?? null;
};

export default getCartItemByProduct;

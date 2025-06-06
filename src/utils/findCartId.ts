import { cartDataType } from '../types/cartItem';

export const findCartId = (carts: cartDataType[] | null, productId: number): number => {
  return carts?.find((cart) => cart.product.id === productId)?.id || 0;
};

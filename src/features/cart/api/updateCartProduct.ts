import { httpClient } from '../../../shared/api/httpClient';

export const updateCartProduct = (cartProductId: number, cartProductQuantity: number) => {
  return httpClient.patch(`/cart-items/${cartProductId}`, {
    quantity: cartProductQuantity,
  });
};

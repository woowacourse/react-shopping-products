import { httpClient } from '../../../shared/api/httpClient';

export const deleteCartProduct = (cartProductId: number): Promise<void> => {
  return httpClient.delete(`/cart-items/${cartProductId}`);
};

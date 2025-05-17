import { httpClient } from '../../../shared/api/httpClient';

export const deleteCartProduct = (productId: number): Promise<void> => {
  return httpClient.delete(`/cart-items/${productId}`);
};

import { httpClient } from '../../../shared/api/httpClient';

export const addCartProduct = (productId: number): Promise<void> => {
  return httpClient.post('/cart-items', {
    productId,
    quantity: 1,
  });
};

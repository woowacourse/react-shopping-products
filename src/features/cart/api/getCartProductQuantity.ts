import { httpClient } from '../../../shared/api/httpClient';

interface CartProductQuantityResponse {
  quantity: number;
}

export const getCartProductQuantity = (): Promise<CartProductQuantityResponse> => {
  return httpClient.get(`/cart-items/counts`);
};

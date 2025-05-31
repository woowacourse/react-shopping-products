import { httpClient } from '../../../shared/api/httpClient';
import { CartProduct } from '../../products/type/product';

interface GetCartProductResponse {
  content: CartProduct[];
}

export const getCartProduct = ({ page = 0, size = 20 }) => {
  return httpClient.get<GetCartProductResponse>(`/cart-items?page=${page}&size=${size}`);
};

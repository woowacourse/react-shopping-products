import {apiClient} from '../../../shared/utils/requestApi';
import {ProductsResponse, CartProduct} from '../../products/type/product';

export const getCartProduct = (): Promise<ProductsResponse<CartProduct>> =>
  apiClient.get({endPoint: `/cart-items?page=0&size=20`});

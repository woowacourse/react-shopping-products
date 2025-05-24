import {apiClient} from '../../../shared/utils/requestApi';
import {ProductsResponse, Product} from '../type/product';

export const getProducts = (
  sortValue: string
): Promise<ProductsResponse<Product>> =>
  apiClient.get({
    endPoint: `/products?sort=${sortValue}&size=20`,
  });

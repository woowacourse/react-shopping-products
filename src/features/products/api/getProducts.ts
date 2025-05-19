import {apiClient} from '../../../shared/utils/requestApi';
import {ProductsResponse, Product} from '../type/product';

interface Query {
  sortValue: string;
}

export const getProducts = ({
  sortValue,
}: Query): Promise<ProductsResponse<Product>> =>
  apiClient.get({
    endPoint: `/products?sort=${sortValue}&size=20`,
  });

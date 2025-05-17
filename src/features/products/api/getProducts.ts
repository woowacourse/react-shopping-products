import { httpClient } from '../../../shared/api/httpClient';
import { ProductDTO } from '../type/product';

interface Query {
  sortValue: string;
}

interface GetProductResponse {
  content: ProductDTO[];
}

export const getProducts = ({ sortValue }: Query) => {
  return httpClient.get<GetProductResponse>(`/products?sort=${sortValue}`);
};

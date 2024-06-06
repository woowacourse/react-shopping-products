import { productApis } from '../../api/product';
import { Product } from '../../types';
import useFetch from '../useFetch';

interface GetProductsResponse {
  last: boolean;
  content: Product[];
}

export const productQueries = {
  useGetProducts: (params: {
    page: number;
    sort: string[];
    category: string;
    size: number;
  }) => {
    return useFetch<GetProductsResponse>({
      queryFn: async () =>
        await productApis.get({
          ...params,
        }),
    });
  },
};

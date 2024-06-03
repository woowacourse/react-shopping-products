import APIError from '../../../api/apiError';
import { productApis } from '../../../api/product';
import { Product } from '../../../types';
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
      queryFn: async () => {
        const response = await productApis.get({
          ...params,
        });

        if (!response.ok)
          throw new APIError(
            response.status,
            '상품 목록을 불러오지 못했습니다.'
          );

        return await response.json();
      },
    });
  },
};

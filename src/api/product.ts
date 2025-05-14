import { ProductListResponse } from '@/features/ProductList/types/Product';

import { ENV } from './env';
import { fetcher } from './fetcher';

export const getProductList = async () => {
  const data = await fetcher
    .get<ProductListResponse>({
      baseUrl: ENV.BASE_URL + 'products',
      query: { page: 0, size: 20, sort: 'price,asc' },
    })
    .then((res) => res);

  return data.content;
};

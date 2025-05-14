import { ProductListResponse, ProductQuery } from '@/features/ProductList/types/Product';

import { ENV } from './env';
import { fetcher } from './fetcher';

export const getProductList = async ({
  page = 0,
  size = 20,
  sort = 'price,asc',
  category = '',
}: Partial<ProductQuery> = {}) => {
  const data = await fetcher
    .get<ProductListResponse>({
      baseUrl: ENV.BASE_URL + 'products',
      token: ENV.TOKEN,
      query: { page, size, sort, category },
    })
    .then((res) => res);

  return data.content;
};

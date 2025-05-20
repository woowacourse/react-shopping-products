import { ProductListResponse, ProductQuery } from '@/features/ProductList/types/Product';

import { fetcher } from './fetcher';

export const getProductList = async ({
  page = 0,
  size = 20,
  sort = 'price,asc',
  category = '',
}: Partial<ProductQuery> = {}) => {
  const data = await fetcher.get<ProductListResponse>({
    endpoint: 'products',
    query: { page, size, sort, category },
  });

  return data.content;
};

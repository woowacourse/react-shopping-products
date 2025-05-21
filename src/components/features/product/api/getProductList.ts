import { baseAPI } from '@/api/baseAPI';
import { buildQueryString } from '@/api/buildQueryString';
import { convertResponseToProduct } from './responseMapper';
import { ProductsResponse } from './type';

export async function getProductList(filterOption: {
  category: string;
  sort: string;
}) {
  const page = 0;
  const size = 20;
  const queryString = buildQueryString([
    {
      name: 'category',
      value: filterOption.category !== '전체' && filterOption.category,
    },
    { name: 'page', value: page },
    { name: 'size', value: size },
    { name: 'sort', value: `price,${filterOption.sort}` },
  ]);

  const basePath = `/products?${queryString}`;

  const data = await baseAPI<ProductsResponse>({
    method: 'GET',
    path: basePath,
  });
  const productsData = data?.content.map((product) =>
    convertResponseToProduct(product)
  );
  return productsData ?? [];
}

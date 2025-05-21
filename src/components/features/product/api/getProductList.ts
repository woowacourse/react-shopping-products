import { baseAPI } from '@/api/baseAPI';
import { DropdownOptionType } from '@/components/common/type';
import { convertResponseToProduct } from './responseMapper';
import { ProductsResponse } from './type';
import { buildQueryString } from '@/api/buildQueryString';

export async function getProductList(filterOption: {
  category: DropdownOptionType;
  sort: DropdownOptionType;
}) {
  const page = 0;
  const size = 20;
  const queryString = buildQueryString([
    {
      name: 'category',
      value:
        filterOption.category.value !== '전체' && filterOption.category.value,
    },
    { name: 'page', value: page },
    { name: 'size', value: size },
    { name: 'sort', value: `price,${filterOption.sort.value}` },
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

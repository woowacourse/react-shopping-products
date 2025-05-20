import { baseAPI } from '@/api/baseAPI';
import { DropdownOptionType } from '@/components/common/type';
import { convertResponseToProduct } from './responseMapper';
import { ProductsResponse } from './type';

export async function getProductList(filterOption: {
  category: DropdownOptionType;
  sort: DropdownOptionType;
}) {
  const page = 0;
  const size = 20;
  const categoryPath =
    filterOption.category.value !== '전체'
      ? `category=${filterOption.category.value}&`
      : '';
  const basePath = `/products?${categoryPath}page=${page}&size=${size}&sort=price,${filterOption.sort.value}`;

  const data = await baseAPI<ProductsResponse>({
    method: 'GET',
    path: basePath,
  });
  const productsData = data?.content.map((product) =>
    convertResponseToProduct(product)
  );
  return productsData ?? [];
}

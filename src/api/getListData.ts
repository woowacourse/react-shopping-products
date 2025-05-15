import { baseAPI } from './baseAPI';
import { ProductData } from './type';
import { convertResponseToProduct } from '../components/features/product/responseMapper';

export async function getListData(filterOption) {
  const page = 0;
  const size = 20;
  const categoryPath =
    filterOption.category.value !== '전체'
      ? `category=${filterOption.category.value}&`
      : '';
  const basePath = `/products?${categoryPath}page=${page}&size=${size}&sort=price,${filterOption.sort.value}`;

  const data = await baseAPI<ProductData>({
    method: 'GET',
    path: basePath,
  });
  const productsData = data?.content.map((product) =>
    convertResponseToProduct(product)
  );
  return productsData ?? [];
}

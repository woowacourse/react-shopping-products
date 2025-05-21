import { baseAPI } from './baseAPI';
import { ProductData } from './type';
import { convertResponseToProduct } from '../components/features/product/responseMapper';

export async function getProductsData(filterOption: {
  category: { value: string };
  sort: { value: string };
}) {
  const page = 0;
  const size = 20;
  const categoryPath =
    filterOption.category.value !== '전체'
      ? `category=${filterOption.category.value}&`
      : '';
  const basePath = `/products?${categoryPath}page=${page}&size=${size}&sort=price,${filterOption.sort.value}`;
  // const delay = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));
  // await delay(5000);
  const data = await baseAPI<ProductData>({
    method: 'GET',
    path: basePath,
  });
  const productsData = data?.content.map((product) =>
    convertResponseToProduct(product)
  );
  return productsData ?? [];
}

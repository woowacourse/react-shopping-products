import { baseAPI } from './baseAPI';
import { APIResponse } from './type';

export enum Category {
  식료품 = '식료품',
  패션잡화 = '패션잡화',
}

export interface ProductContent {
  id: number;
  name: null | string;
  price: number;
  imageUrl: null | string;
  quantity: number;
  category: Category | null;
}

export type ProductCategoryType = '전체' | Category;
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: ProductCategoryType;
}

export type ProductResponse = APIResponse<ProductContent>;

export const convertResponseToProduct = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  category,
}: ProductContent): Product => ({
  id: id.toString(),
  name: name ?? '',
  price,
  imageUrl: imageUrl ?? 'defaultImage',
  quantity: quantity ?? 0,
  category: (category ?? '전체') as ProductCategoryType,
});

export async function getProductsData(filterOption: {
  category: { value: string };
  sort: { value: string };
}) {
  const params = new URLSearchParams();
  params.set('page', '0');
  params.set('size', '20');
  params.set('sort', `price,${filterOption.sort.value}`);

  if (filterOption.category.value !== '전체') {
    params.set('category', filterOption.category.value);
  }

  const basePath = `/products?${params.toString()}`;

  const data = await baseAPI<ProductResponse>({
    method: 'GET',
    path: basePath,
  });
  const productsData = data?.content.map((product) =>
    convertResponseToProduct(product)
  );
  return productsData ?? [];
}

import * as PRODUCTS from '../constants/pagination';
import { Category, ProductsResponseData, Sort } from '../types/product';
import { PRODUCTS_ENDPOINT } from './endpoints';

export async function fetchProducts(
  page: number,
  category: Category = 'all',
  sort: Sort,
): Promise<ProductsResponseData> {
  const size = page === PRODUCTS.FIRST_PAGE ? PRODUCTS.FIRST_PAGE_SIZE : PRODUCTS.SIZE_PER_PAGE;
  const params = new URLSearchParams();

  if (category !== 'all') params.append('category', category);
  params.append('page', String(page));
  params.append('size', String(size));

  Object.entries(sort).forEach(([condition, order]) =>
    params.append('sort', `${condition},${order}`),
  );

  const response = await fetch(`${PRODUCTS_ENDPOINT}?${params.toString()}`);

  if (response.status === 500) {
    throw new Error(
      '서버에 문제가 발생했습니다. 관리자에게 문의하시거나 잠시 후 다시 시도해주세요.',
    );
  }

  if (!response.ok) throw new Error('Failed to fetch products');

  const data = await response.json();

  return data;
}

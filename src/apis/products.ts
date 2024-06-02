import { Category, Sort } from '../types/type';

import { PRODUCTS_ENDPOINT } from './config';
import response from './response';

export async function fetchProductList(
  page: number,
  limit: number,
  category: Category = 'all',
  sortOption: Sort = 'price,asc',
) {
  const requiredQuery = `page=${page}&size=${limit}`;

  const categoryQuery = category === 'all' ? '' : `category=${category}&`;

  const sortOptionQuery = `sort=${sortOption}`;

  const data = await response({
    url: `${PRODUCTS_ENDPOINT}?${categoryQuery}${requiredQuery}&${sortOptionQuery}`,
    method: 'GET',
    errorMessage: '상품목록을 불러오는데 실패했어요.',
  });

  return data;
}

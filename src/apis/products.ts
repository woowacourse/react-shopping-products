import { Category, Sort } from '../types/type';
import { END_POINTS } from './config';

import response from './response';

export async function fetchProductList(
  page: number,
  limit: number,
  category: Category = 'all',
  sortOption: Sort = 'price,asc',
) {
  const requiredQuery = `page=${page}&size=${limit}`;
  const categoryQuery = category === 'all' ? '' : `category=${category}&`;
  const sortOptionQuery = `sort=${sortOption}&sort=name,asc`;

  const data = await response({
    url: `${END_POINTS.PRODUCTS}?${categoryQuery}${requiredQuery}&${sortOptionQuery}`,
    method: 'GET',
  });

  return data;
}

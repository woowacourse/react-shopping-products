import { Category, Sort } from '../types/type';

import { END_POINTS } from './config';
import response from './response';

interface FetchProductListProps {
  page: number;
  limit: number;
  category?: Category;
  sort?: Sort;
}

export async function fetchProductList({
  page,
  limit,
  category = 'all',
  sort = 'price,asc',
}: FetchProductListProps) {
  const requiredQuery = `page=${page}&size=${limit}`;
  const categoryQuery = category === 'all' ? '' : `category=${category}&`;
  const sortQuery = `sort=${sort}&sort=name,asc`;

  const data = await response({
    url: `${END_POINTS.PRODUCTS}?${categoryQuery}${requiredQuery}&${sortQuery}`,
    method: 'GET',
  });

  return await data;
}

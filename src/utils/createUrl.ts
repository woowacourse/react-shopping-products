import { PRODUCTS_ENDPOINT } from '../constants/apis';
import { CategoryQueryString, PRODUCTS_SIZE, SortOptionQueryString } from '../constants/products';

interface CreateUrlProps {
  page: number;
  category: CategoryQueryString;
  sortOption: SortOptionQueryString;
}

export default function createUrl({ page, category, sortOption }: CreateUrlProps) {
  const pageNumberForRequest = page === 0 ? page : page + PRODUCTS_SIZE.perRequest;
  const categoryString = category === 'all' ? '' : `&category=${category}`;
  const productSizeForRequest = page === 0 ? 20 : PRODUCTS_SIZE.perRequest;

  return `${PRODUCTS_ENDPOINT}?page=${pageNumberForRequest}&size=${productSizeForRequest}${categoryString}&sort=price,${sortOption}`;
}

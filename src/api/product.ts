import { END_POINT } from './endpoints';
import fetcher from './fetcher';

import { ProductCategory, ProductResponse, SortValue } from '@/types/product';

interface FetchProductListProps {
  size?: number;
  category: ProductCategory;
  page?: number;
  sortOptions?: SortValue;
}

const covertUrlFormat = ({ category, page, size, sortOptions }: FetchProductListProps) => {
  const priceSort = `price,${sortOptions}`;
  const encodedSort = encodeURIComponent(priceSort);

  const pageQuery = `?page=${page}`;
  const categoryQuery = category !== 'all' ? `&category=${category}` : '';
  const sizeQuery = size ? `&size=${size}` : '';
  const sortQuery = sortOptions ? `&sort=${encodedSort}` : '';
  return `${END_POINT.products}${pageQuery}${categoryQuery}${sizeQuery}${sortQuery}`;
};

export const fetchProductList = async ({
  category,
  size,
  page = 0,
  sortOptions,
}: FetchProductListProps): Promise<ProductResponse> => {
  const response = await fetcher.get({
    url: covertUrlFormat({ category, page, size, sortOptions }),
  });

  const data = await response.json();

  return data;
};

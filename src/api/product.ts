import { PRODUCTS } from './endpoints';
import fetcher from './fetcher';

import { ProductCategory, ProductResponse, Sort } from '@/types/product';

interface FetchProductListProps {
  size?: number;
  category?: ProductCategory;
  page?: number;
  sortOptions?: Sort;
}

const covertUrlFormat = ({ category, page, size, sortOptions }: FetchProductListProps) => {
  const priceSort = `price,${sortOptions}`;
  const encodedSort = encodeURIComponent(priceSort);

  const pageQuery = `?page=${page}`;
  const categoryQuery = category ? `&category=${category}` : '';
  const sizeQuery = size ? `&size=${size}` : '';
  const sortQuery = sortOptions ? `&sort=${encodedSort}` : '';
  return `${PRODUCTS}${pageQuery}${categoryQuery}${sizeQuery}${sortQuery}`;
};

export const fetchProductList = async ({
  category,
  size,
  page = 0,
  sortOptions,
}: FetchProductListProps): Promise<ProductResponse> => {
  const response = await fetcher.get({
    url: covertUrlFormat({ category, page, size, sortOptions }),
    errorMessage: '상품 리스트 불러오기에 실패했습니다🥹',
  });

  const data = await response.json();

  return data;
};

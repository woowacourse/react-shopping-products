import { PRODUCTS } from './endpoints';
import fetcher from './fetcher';

import { ProductResponse } from '@/types/product';

type Sort = 'asc' | 'desc';

interface FetchProductListProps {
  size: number;
  page?: number;
  sortOptions?: Sort;
}

const covertUrlFormat = ({ page, size, sortOptions }: FetchProductListProps) => {
  const priceSort = `price,${sortOptions}`;
  const encodedSort = encodeURIComponent(priceSort);

  const pageQuery = page ? `?page=${page}` : '';
  const sizeQuery = size ? `&size=${size}` : '';
  const sortQuery = sortOptions ? `&sort=${encodedSort}` : '';
  return `${PRODUCTS}${pageQuery}${sizeQuery}${sortQuery}`;
};

export const fetchProductList = async ({
  size,
  page,
  sortOptions,
}: FetchProductListProps): Promise<ProductResponse> => {
  const response = await fetcher.get({
    url: covertUrlFormat({ page, size, sortOptions }),
    errorMessage: '상품 리스트 불러오기에 실패했습니다🥹',
  });

  const data = await response.json();

  return data;
};

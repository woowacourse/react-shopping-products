import { END_POINT } from './endpoints';
import fetcher from './fetcher';

import { ProductCategory, ProductResponse, SortValue } from '@/types/product';
import { createUrlQuery } from '@/utils/createUrlQuery';

interface FetchProductListProps {
  size?: number;
  category: ProductCategory;
  page?: number;
  sortOptions?: SortValue;
}

const convertUrlFormat = ({ category, page, size, sortOptions }: FetchProductListProps) => {
  const params = createUrlQuery({ category, page, size, sortOptions });
  return `${END_POINT.products}?${params.toString()}`;
};

export const fetchProductList = async ({
  category,
  size,
  page = 0,
  sortOptions,
}: FetchProductListProps): Promise<ProductResponse> => {
  const response = await fetcher.get({
    url: convertUrlFormat({ category, page, size, sortOptions }),
    errorMessage: '상품 리스트 불러오기에 실패했습니다🥹',
  });

  const data = await response.json();

  return data;
};

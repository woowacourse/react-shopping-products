import { requestGet } from '../fetcher';
import { BASE_URL } from '../baseUrl';
import { Category } from '@/types/filter.type';
import { SortValue } from '@/constants/filter';
import { ENDPOINT } from '../endpoints';
import { ResponseProductList } from '../responseTypes';
import { Product } from '@/types/product.type';
import { PageParams } from '@/types/infiniteScroll';

type QueryParams = {
  page: number;
  size: number;
  sort: string;
  category?: string;
};

export const requestProductList = async ({
  page,
  size,
  category,
  sortType,
}: {
  page: number;
  size: number;
  category: Category;
  sortType: SortValue;
}): Promise<PageParams<Product>> => {
  const queryParams: QueryParams = {
    page,
    size,
    sort: sortType,
  };

  if (category !== 'all') queryParams.category = category;

  const { content, pageable, last } = await requestGet<ResponseProductList>({
    baseUrl: BASE_URL.SHOP,
    endpoint: ENDPOINT.PRODUCT,
    queryParams,
  });

  return {
    content,
    hasNextPage: !last,
    nextCursor: pageable.pageNumber + 1,
  };
};

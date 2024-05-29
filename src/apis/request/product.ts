import { Category, SortType, Product } from '@/types';
import { requestGet } from '../fetcher';
import { BASE_URL } from '../baseUrl';
import { ENDPOINT } from '../endpoints';

type ResponseProductList = {
  content: Product[];
  totalPages: number;
};

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
  sortType: SortType;
}) => {
  const queryParams: QueryParams = {
    page,
    size,
    sort: sortType,
  };

  if (category !== 'all') queryParams.category = category;

  const { content, totalPages } = await requestGet<ResponseProductList>({
    baseUrl: BASE_URL.SHOP,
    endpoint: ENDPOINT.PRODUCT_LIST,
    queryParams,
  });

  return {
    paginatedProducts: content,
    totalPages,
  };
};

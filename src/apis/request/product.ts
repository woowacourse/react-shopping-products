import { requestGet } from '../fetcher';
import { BASE_URL } from '../baseUrl';
import { PRODUCT_ENDPOINT } from '../endpoints';
import { Category } from '@/types/filter.type';
import { Product } from '@/types/product.type';
import { SortValue } from '@/constants/filter';

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
  sortType: SortValue;
}) => {
  const queryParams: QueryParams = {
    page,
    size,
    sort: sortType,
  };

  if (category !== 'all') queryParams.category = category;

  const { content, totalPages } = await requestGet<ResponseProductList>({
    baseUrl: BASE_URL.SHOP,
    endpoint: PRODUCT_ENDPOINT.PRODUCT_LIST,
    queryParams,
  });

  return {
    paginatedProducts: content,
    totalPages,
  };
};

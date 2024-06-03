import { requestGet } from '../fetcher';
import { BASE_URL } from '../baseUrl';
import { Category } from '@/types/filter.type';
import { Product } from '@/types/product.type';
import { SortValue } from '@/constants/filter';
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
    endpoint: ENDPOINT.PRODUCT,
    queryParams,
  });

  return {
    paginatedProducts: content,
    totalPages,
  };
};

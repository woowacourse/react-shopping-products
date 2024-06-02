import useFetch from '../useFetch';

import { PRODUCTS_ENDPOINT } from '../../../api/endpoints';
import {
  FetchProductsQueryParams,
  FetchProductsResponse,
} from '../../../api/types';
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  PAGE_SIZE,
} from '../../../constants/paginationRules';

const useFetchProducts = () => {
  const { fetchData, loading, error } = useFetch<FetchProductsResponse>({
    url: PRODUCTS_ENDPOINT,
  });

  const fetchProducts = async (queryParams: FetchProductsQueryParams) => {
    // TODO: 다양한 API 오류에 대응할 수 있는 메세지 작성하기
    const response = await fetchData({
      errorMessage: '일시적인 오류로 상품 목록을 불러오는 데 실패했습니다.',
      queryParams: {
        ...queryParams,
        size:
          queryParams.page === INITIAL_PAGE_NUMBER
            ? INITIAL_PAGE_SIZE
            : PAGE_SIZE,
        sort: Object.entries(queryParams.sort).map(
          ([field, value]) => `${field},${value}`
        ),
      },
    });

    return response;
  };

  return { fetchProducts, loading, error };
};

export default useFetchProducts;

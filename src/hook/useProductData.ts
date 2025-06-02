import { useCallback, useEffect, useRef } from 'react';
import { CategoryOption, SortOption } from '../types/common';
import { ProductListResponse } from '../types/response';
import useResource from './useResource';

const PRODUCTS_URL = '/products';

const getInitialProductData = (): ProductListResponse => ({
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalElements: 0,
  totalPages: 0,
  size: 0,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  first: true,
  numberOfElements: 0,
  empty: true,
});

const useProductData = (
  sortOption: SortOption,
  categoryOption: CategoryOption
) => {
  const getParams = useCallback(() => {
    const params: Record<string, string | number> = {
      page: 0,
      size: 20,
    };

    if (categoryOption !== '전체') {
      params.category = categoryOption;
    }

    if (sortOption === '높은 가격순') {
      params.sort = 'price,desc';
    } else {
      params.sort = 'price,asc';
    }

    return params;
  }, [categoryOption, sortOption]);

  const prevParamsRef = useRef<string>('');

  const {
    data: responseData,
    isLoading,
    error,
    refetch,
  } = useResource<ProductListResponse>(PRODUCTS_URL, {
    params: getParams(),
    initialData: getInitialProductData(),
    autoFetch: true,
  });

  useEffect(() => {
    const currentParams = JSON.stringify(getParams());
    if (prevParamsRef.current && prevParamsRef.current !== currentParams) {
      refetch();
    }
    prevParamsRef.current = currentParams;
  }, [sortOption, categoryOption, refetch, getParams]);

  return {
    products: responseData?.content || [],
    error,
    isLoading,
    retryFetch: refetch,
  };
};

export default useProductData;

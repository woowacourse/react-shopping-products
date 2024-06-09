import { useCallback, useEffect } from 'react';

import { Product } from '@appTypes/product';

import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@apis/product/product';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import { InfinityScrollResponse } from '@appTypes/response';

interface UseProductResult {
  products: Product[];
  page: number;
  dropdownOptions: ProductDropdownOptions;
  isLoading: boolean;
  updateNextProductItem: () => void;
}

const useProducts = (dropdownOptions: ProductDropdownOptions): UseProductResult => {
  const {
    data,
    hasNextPage,
    error,
    isError,
    isFetching: isInfiniteScrollLoading,
    fetchNextPage,
  } = useSuspenseInfiniteQuery<
    InfinityScrollResponse<Product[]>,
    Error,
    InfiniteData<InfinityScrollResponse<Product[]>, number>,
    (string | ProductDropdownOptions)[],
    number
  >({
    queryKey: ['products', dropdownOptions],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam, ...dropdownOptions }),
    getNextPageParam: (lastPage, allPages) => (lastPage.last ? undefined : allPages.length),
  });

  const showToast = useToastContext();

  useEffect(() => {
    if (error) showToast(error.message);
  }, [error, showToast]);

  const updateNextProductItem = useCallback(() => {
    if (!hasNextPage || isInfiniteScrollLoading || isError) return;

    fetchNextPage();
  }, [hasNextPage, fetchNextPage, isInfiniteScrollLoading, isError]);

  const page = data.pageParams[data.pageParams.length - 1];

  return {
    products: data.pages.flatMap((page) => page.content),
    page,
    dropdownOptions,
    isLoading: isInfiniteScrollLoading,
    updateNextProductItem,
  };
};

export default useProducts;

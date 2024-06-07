import { useCallback, useEffect } from 'react';

import { Product } from '@appTypes/product';

import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@apis/product/product';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

interface UseProductResult {
  products: Product[];
  page: number;
  dropdownOptions: ProductDropdownOptions;
  isLoading: boolean;
  error: Error | null;
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
  } = useInfiniteQuery({
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
    if (hasNextPage === false || isInfiniteScrollLoading || isError) return;

    fetchNextPage();
  }, [hasNextPage, fetchNextPage, isInfiniteScrollLoading, isError]);

  const page = (data?.pageParams[data?.pageParams.length - 1] as number) ?? 0;

  return {
    products: data?.pages.flatMap((page) => page.content) ?? [],
    page,
    dropdownOptions,
    isLoading: isInfiniteScrollLoading,
    updateNextProductItem,
    error,
  };
};

export default useProducts;

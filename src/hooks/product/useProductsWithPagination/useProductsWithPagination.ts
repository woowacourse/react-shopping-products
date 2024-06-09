import { useCallback, useEffect } from 'react';

import { Product } from '@appTypes/product';

import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';

import { useProducts } from '@queries/product/useProducts';

interface UseProductResult {
  products: Product[];
  page: number;
  dropdownOptions: ProductDropdownOptions;
  isLoading: boolean;
  updateNextProductItem: () => void;
}

const useProductsWithPagination = ({
  dropdownOptions,
  showToast,
}: {
  dropdownOptions: ProductDropdownOptions;
  showToast: (message: string) => void;
}): UseProductResult => {
  const {
    data,
    hasNextPage,
    error,
    isError,
    isFetching: isInfiniteScrollLoading,
    fetchNextPage,
  } = useProducts(dropdownOptions);

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

export default useProductsWithPagination;

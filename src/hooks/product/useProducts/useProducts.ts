import { useCallback } from 'react';

import { Product } from '@appTypes/product';

import useSelectProductDropdown from '@hooks/product/useSelectProductDropdown';
import {
  ProductDropdownOptionKeys,
  ProductDropdownOptions,
} from '@components/product/ProductDropdown/ProductDropdown.type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@apis/product/product';

interface UseProductResult {
  products: Product[];
  page: number;
  dropdownOptions: ProductDropdownOptions;
  isLoading: boolean;
  updateNextProductItem: () => void;
  onSelectOption: <T extends ProductDropdownOptionKeys>(
    type: 'sort' | 'category',
    option: T
  ) => void;
}

const useProducts = (): UseProductResult => {
  const { dropdownOptions, onSelectOption } = useSelectProductDropdown();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching: isInfiniteScrollLoading,
  } = useInfiniteQuery({
    queryKey: ['products', dropdownOptions],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam, ...dropdownOptions }),
    getNextPageParam: (lastPage, allPages) => (lastPage.last ? undefined : allPages.length),
  });

  const updateNextProductItem = useCallback(() => {
    if (hasNextPage === false) return;

    fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const page = (data?.pageParams[data?.pageParams.length - 1] as number) ?? 0;

  return {
    products: data?.pages.flatMap((page) => page.content) ?? [],
    page,
    dropdownOptions,
    isLoading: isInfiniteScrollLoading,
    updateNextProductItem,
    onSelectOption,
  };
};

export default useProducts;

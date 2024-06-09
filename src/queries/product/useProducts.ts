import { fetchProducts } from '@apis/product/product';
import { Product } from '@appTypes/product';
import { InfinityScrollResponse } from '@appTypes/response';
import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';
import { QUERY_KEY } from '@queries/queryKey';
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useProducts = (dropdownOptions: ProductDropdownOptions) => {
  return useSuspenseInfiniteQuery<
    InfinityScrollResponse<Product[]>,
    Error,
    InfiniteData<InfinityScrollResponse<Product[]>, number>,
    (string | ProductDropdownOptions)[],
    number
  >({
    queryKey: QUERY_KEY.productsWithPagination(dropdownOptions),
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam, ...dropdownOptions }),
    getNextPageParam: (lastPage, allPages) => (lastPage.last ? undefined : allPages.length),
  });
};

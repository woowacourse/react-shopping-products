import { fetchProductList } from '@/api/product';
import { PRODUCT_DATA_SIZE } from '@/constants/productData';
import { Category, ProductResponse, SortOption } from '@/types/product';
import { useInfiniteQuery } from '@tanstack/react-query';

interface useGetProductListProp {
  category: Category;
  order: SortOption;
}
export const productQuery = {
  useGetProductList({ category, order }: useGetProductListProp) {
    return useInfiniteQuery<ProductResponse>({
      queryKey: ['fetchProductList', category, order],
      queryFn: ({ pageParam }) =>
        fetchProductList({
          page: pageParam as number,
          category: category.value,
          size: pageParam === 0 ? PRODUCT_DATA_SIZE.FIRST_PAGE : PRODUCT_DATA_SIZE.NEXT_PAGE,
          sortOptions: order.value,
        }),
      initialPageParam: 0,
      getNextPageParam: (currentPage, allPages) => {
        const nextPage = allPages.length;
        return currentPage.last ? null : nextPage;
      },
      retry: 3,
      staleTime: 5000 * 60,
    });
  },
};

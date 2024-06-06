import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/product';
import { PAGE_INTERVAL, SIZE } from '../../constants/api';
import { Product } from '../../types/Product.type';
import { Option } from '../../types/Option.type';
import { QUERY_KEYS } from '../../api/queryKeys';
import { useContext } from 'react';
import { ToastContext } from '../../context/ToastProvider';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  isLast: boolean;
  handlePage: () => void;
}

const useProducts = (category: Option, sort: Option): UseProductsResult => {
  const { showToast } = useContext(ToastContext);

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, category, sort],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchProducts(category.key, pageParam, SIZE.ADDITIONAL, sort.key);
      const pageInterval = pageParam === 0 ? PAGE_INTERVAL.INITIAL : PAGE_INTERVAL.DEFAULT;
      return {
        data: response.data,
        isLast: response.isLast,
        nextPage: response.isLast ? null : pageParam + pageInterval,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const products = data?.pages.flatMap((page) => page.data) || [];

  if (error) showToast(error.message);

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    products,
    loading: isFetching || isFetchingNextPage,
    error,
    isLast: !hasNextPage,
    handlePage,
  };
};

export default useProducts;

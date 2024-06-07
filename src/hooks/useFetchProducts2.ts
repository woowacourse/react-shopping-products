import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types/fetch';
import { SortingParam } from '../types/sort';

const getSize = (page: number) => (page === 0 ? 20 : 4);
const getPage = (lastPage: number) =>
  lastPage === 0 ? lastPage + 5 : lastPage + 1;

interface useProductProps {
  sortings?: SortingParam[];
  filter?: string;
  options?: object;
}
const useProducts = ({ sortings, filter, options }: useProductProps) => {
  const defaultOptions = {
    queryKey: ['product', sortings, filter],
    queryFn: async ({ pageParam }) =>
      await fetchProducts(pageParam, getSize(pageParam), sortings, filter),
    initialPageParam: 0,
    getNextPageParam: (_, __, lastPageParam) => getPage(lastPageParam),
  };

  const [products, setProducts] = useState<Product[]>([]);

  const {
    data,
    isError,
    isPending,
    isSuccess,
    isFetching,
    hasNextPage,
    fetchNextPage: fetchNext,
  } = useInfiniteQuery({
    ...defaultOptions,
    ...options,
  });

  useEffect(() => {
    if (!data) return;
    setProducts(
      data.pages
        .map((page) => page.content)
        .reduce((prev, cur) => [...prev, ...cur], []),
    );
  }, [data, setProducts]);

  const isLast = !hasNextPage;

  return { products, data, isError, isPending, isLast, isFetching, fetchNext };
};

export default useProducts;

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
  const {
    data,
    isError,
    isPending,
    isFetching,
    hasNextPage,
    fetchNextPage: fetchNext,
  } = useInfiniteQuery({
    queryKey: ['product', sortings, filter],
    queryFn: async ({ pageParam }) =>
      await fetchProducts(pageParam, getSize(pageParam), sortings, filter),
    initialPageParam: 0,
    getNextPageParam: (lastPage, __, lastPageParam: number) =>
      lastPage.last ? undefined : getPage(lastPageParam),

    ...options,
  });

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (!data) return;
    setProducts(
      data.pages
        .map((page) => page.content)
        .reduce((prev, cur) => [...prev, ...cur], []),
    );
  }, [data, setProducts]);

  const isLast = !hasNextPage;
  const page = data ? data.pages.length - 1 : -1;

  return {
    products,
    page,
    data,
    isError,
    isPending,
    isLast,
    isFetching,
    fetchNext,
  };
};

export default useProducts;

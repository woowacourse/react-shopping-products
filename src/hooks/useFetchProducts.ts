import { useState } from 'react';

import { fetchProducts } from '../api/products';

import { Category, Order, Sort } from '../types/product';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FIRST_PAGE, GAP_WITH_FIRST_PAGE } from '../constants/pagination';
import { QUERY_KEYS } from '../constants/queryKeys';

const useFetchProducts = () => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState<Category>('all');
  const [sort, setSort] = useState<Sort>({
    price: 'asc',
    name: 'asc',
  });

  const { data, error, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.products, category, sort],
      queryFn: ({ pageParam }: { pageParam: number }) => fetchProducts(pageParam, category, sort),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const prevPage = allPages.length;
        const nextPage = prevPage + GAP_WITH_FIRST_PAGE - 1;

        return lastPage.last ? undefined : nextPage;
      },
    });

  const contents = data?.pages.map(({ content }) => content);
  const products = contents?.reduce(
    (prevContents, nextContents) => [...prevContents, ...nextContents],
    [],
  );

  const filterByCategory = (selectedCategory: Category) => {
    if (selectedCategory === category) return;

    setCategory(selectedCategory);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.products, FIRST_PAGE, selectedCategory, { price: 'asc', name: 'asc' }],
    });
  };

  const setSorting = async (condition: string, order: Order) => {
    if (sort.price === order) return;

    setSort((prevSort) => ({ ...prevSort, [condition]: order }));
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.products, FIRST_PAGE, 'all', { ...sort, [condition]: order }],
    });
  };

  return {
    products,
    isLoading,
    error,
    sort,
    category,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    filterByCategory,
    setSorting,
  };
};

export default useFetchProducts;

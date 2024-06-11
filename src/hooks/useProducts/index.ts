import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchProducts } from '../../api/products';

import { Category, Order, Sort } from '../../types/product';
import * as PRODUCTS from '../../constants/pagination';
import { queryKeys } from '../../constants/queryKeys';

const useFetchProducts = () => {
  const [category, setCategory] = useState<Category>('all');
  const [sort, setSort] = useState<Sort>({
    price: 'asc',
    name: 'asc',
  });

  const { data, error, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.products(category, sort),
      queryFn: ({ pageParam }: { pageParam: number }) => fetchProducts(pageParam, category, sort),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        const nextPage = lastPageParam + PRODUCTS.GAP_WITH_FIRST_PAGE;

        return lastPage.last ? undefined : nextPage;
      },
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.content),
        pageParams: data.pageParams,
      }),
    });

  const filterByCategory = (selectedCategory: Category) => {
    if (selectedCategory === category) return;

    setCategory(selectedCategory);
  };

  const setSorting = async (condition: string, order: Order) => {
    if (sort.price === order) return;

    setSort((prevSort) => ({ ...prevSort, [condition]: order }));
  };

  return {
    products: data?.pages,
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

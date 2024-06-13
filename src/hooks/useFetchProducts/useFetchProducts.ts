import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { usePagination } from '../index';
import { fetchProducts } from '../../api/products';
import { Product } from '../../types/fetch';
import { SortingParam } from '../../types/sort';
import { DEFAULT_SORTING_PARAM, SIZE } from '../../constants/page';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useFetchProducts = (
  sortings: SortingParam[] = [DEFAULT_SORTING_PARAM],
  filter: string | '' = '',
) => {
  // const [products, setProducts] = useState<Product[]>([]);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isError,

    ...result
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.product, sortings, filter],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts(
        pageParam,
        pageParam === 0 ? SIZE.DEFAULT : SIZE.INTERVAL,
        sortings,
        filter,
      ),
    initialPageParam: 0,
    getNextPageParam: (data) => {
      if (data.last) return null;
      if (data.pageable.pageNumber === 0) return 5;
      return data.pageable.pageNumber + 1;
    },
    select: (data) => (data.pages ?? []).flatMap((page) => page.content),
  });
  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    products: data,
    isError,
    ...result,
  };

  // const {
  //   size,
  //   page,
  //   fetchedPage,
  //   fetchNextPage,
  //   resetPage,
  //   isLast,
  //   setIsLast,
  // } = usePagination();

  // const [products, setProducts] = useState<Product[]>([]);

  // const query = useQuery({
  //   queryKey: [QUERY_KEYS.product, sortings, filter],
  //   queryFn: () => fetchProducts(fetchedPage, size, sortings, filter),
  // });

  // useEffect(() => {
  //   if (!query.data) return;

  //   setIsLast(query.data.last);

  //   if (fetchedPage === 0) {
  //     setProducts(query.data.content);
  //     return;
  //   }
  //   setProducts((prevProducts) => [...prevProducts, ...query.data.content]);
  // }, [query.data, page, fetchedPage]);

  // return {
  //   ...query,
  //   data: products,
  //   fetchNextPage,
  //   resetPage,
  //   isLast,
  //   page,
  // };
};

export default useFetchProducts;

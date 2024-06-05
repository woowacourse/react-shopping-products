import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { usePagination } from './usePagination';
import { fetchProducts } from '../api/products';
import { Product } from '../types/fetch';
import { SortingParam } from '../types/sort';
import { DEFAULT_SORTING_PARAM } from '../constants/page';

const useFetchProducts = (
  sortings: SortingParam[] = [DEFAULT_SORTING_PARAM],
  filter: string | '' = '',
) => {
  const { size, fetchedPage, fetchNextPage, resetPage, isLast, setIsLast } =
    usePagination();

  const [products, setProducts] = useState<Product[]>([]);

  const query = useQuery({
    queryKey: ['products', sortings, filter, fetchedPage],
    queryFn: () => fetchProducts(fetchedPage, size, sortings, filter),
  });

  useEffect(() => {
    if (!query.data) return;

    setIsLast(query.data.last);

    if (fetchedPage === 0) {
      setProducts(query.data.content);
      return;
    }
    setProducts((prevProducts) => [...prevProducts, ...query.data.content]);
  }, [query.data, sortings, filter]);

  return {
    ...query,
    data: products,
    fetchNextPage,
    resetPage,
    isLast,
  };
};

export default useFetchProducts;

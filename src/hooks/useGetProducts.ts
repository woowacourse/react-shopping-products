import { useCallback, useEffect } from 'react';
import { useResource } from './useResource';
import { ProductDTOType } from '../types/product';
import getProducts from '../api/getProducts';

export const useGetProducts = ({ sort, category }: { sort: string; category: string }) => {
  const productsFetcher = useCallback(
    async ({ sort, category }: { sort: string; category: string }) => {
      return getProducts({ category, sortKey: 'price', sortOrder: sort });
    },
    [],
  );

  const {
    data: products,
    isLoading,
    isError,
    fetchData,
  } = useResource<ProductDTOType[], { sort: string; category: string }>(
    `products-${sort}-${category}`,
    productsFetcher,
  );

  useEffect(() => {
    fetchData({ sort, category });
  }, [sort, category, fetchData]);

  return { isLoading, isError, products };
};

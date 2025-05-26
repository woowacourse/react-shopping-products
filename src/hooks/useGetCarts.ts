import { useCallback, useEffect } from 'react';
import { useResource } from './useResource';
import getCarts from '../api/getCarts';
import { CartDataType } from '../contexts/CartContext';

export default function useGetCarts() {
  const cartsFetcher = useCallback(async () => {
    return await getCarts();
  }, []);

  const {
    data: carts,
    isLoading,
    isFetching,
    isError,
    fetchData,
  } = useResource<CartDataType[]>('carts', cartsFetcher);

  useEffect(() => {
    if (!carts && !isLoading) {
      fetchData(undefined, true);
    }
  }, [carts, isLoading, fetchData]);

  const refetchCarts = useCallback(async () => {
    return await fetchData(undefined, false);
  }, [fetchData]);

  const cartItemCount = carts ? new Set(carts.map((cart) => cart.product.id)).size : 0;

  return {
    isLoading,
    isFetching,
    isError,
    carts,
    cartItemCount,
    refetchCarts,
  };
}

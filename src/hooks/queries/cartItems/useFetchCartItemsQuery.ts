import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';

import { fetchCartItems } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';

type UseFetchCartItemsQueryProp = Omit<
  UseQueryOptions<CartItemInfo[], Error, CartItemInfo[], QueryKey>,
  'queryKey' | 'queryFn'
>;

const useFetchCartItemsQuery = (queryOptions?: UseFetchCartItemsQueryProp) => {
  return useQuery({
    queryKey: [CART_KEYS.fetch],
    queryFn: fetchCartItems,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};

export default useFetchCartItemsQuery;

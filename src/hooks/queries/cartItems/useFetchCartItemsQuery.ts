import { useQuery } from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';

import { fetchCartItems } from '@/api/cart';

const useFetchCartItemsQuery = () => {
  return useQuery({
    queryKey: [CART_KEYS.fetch],
    queryFn: fetchCartItems,
    initialData: [],
    refetchOnWindowFocus: false,
  });
};

export default useFetchCartItemsQuery;

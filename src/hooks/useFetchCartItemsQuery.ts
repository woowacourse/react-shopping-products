import { useQuery } from '@tanstack/react-query';

import { fetchCartItems } from '@/api/cart';

const useFetchCartItemsQuery = () => {
  return useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
    initialData: [],
    refetchOnWindowFocus: false,
    staleTime: 20 * 1000,
  });
};

export default useFetchCartItemsQuery;

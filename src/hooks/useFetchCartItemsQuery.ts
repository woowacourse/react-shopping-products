import { useQuery } from '@tanstack/react-query';

import { fetchCartItems } from '@/api/cart';

const useFetchCartItemsQuery = () => {
  return useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
    initialData: [],
    refetchOnWindowFocus: false,
  });
};

export default useFetchCartItemsQuery;

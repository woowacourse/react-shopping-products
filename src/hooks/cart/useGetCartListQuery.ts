import { QUERY_KEYS } from '@/constants/queryKeys';
import { getCartList } from '@/api/cartItem';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetCartListQuery = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartList,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetCartListQuery;

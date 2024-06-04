import { QUERY_KEYS } from '@/constants/queryKeys';
import { getCartList } from '@/api/cartItem';
import { useQuery } from '@tanstack/react-query';

const useGetCartListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartList,
  });
};

export default useGetCartListQuery;

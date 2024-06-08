import { getCartListQuantity } from '@/api/cartItem';
import QUERY_KEYS from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useCartItemTotalQuantity = () => {
  const {
    data: totalQuantity,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.CART.BASE, QUERY_KEYS.CART.TOTAL_QUANTITY],
    queryFn: getCartListQuantity,
  });

  return { totalQuantity, isError, isLoading };
};

export default useCartItemTotalQuantity;

import { getCartList } from '@/api/cartItem';
import { QUERY_KEYS } from '@/constants/index';
import { CartItem } from '@/types/index';
import { useQuery } from '@tanstack/react-query';

const useFetchCartItems = () => {
  const {
    data: cartItemList,
    isError,
    isLoading,
  } = useQuery<CartItem[]>({
    queryKey: [QUERY_KEYS.CART.BASE, QUERY_KEYS.CART.FETCH],
    queryFn: getCartList,
    initialData: [],
  });

  return { cartItemList, isError, isLoading };
};

export default useFetchCartItems;

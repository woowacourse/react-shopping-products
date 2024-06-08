import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { fetchCartItems } from '../api/cartItems';

const useCartItems = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.cartItem],
    queryFn: fetchCartItems,
  });
};

export default useCartItems;

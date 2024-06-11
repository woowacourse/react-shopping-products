import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKeys';
import { fetchCartItems } from '../api/cartItems';

const useCartItems = () => {
  return useQuery({
    queryKey: [QUERY_KEY.cartItem],
    queryFn: fetchCartItems,
  });
};

export default useCartItems;

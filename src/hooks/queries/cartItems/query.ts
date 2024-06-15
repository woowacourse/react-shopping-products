import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/queryKeys';
import { fetchCartItems } from '../../../api/cartItems';

export const useCartItemsQuery = () =>
  useQuery({
    queryKey: [QUERY_KEY.cartItem],
    queryFn: fetchCartItems,
  });

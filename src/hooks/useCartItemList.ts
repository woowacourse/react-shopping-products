import { useQuery } from '@tanstack/react-query';

import { fetchCartItemList } from '../apis/carItems';
import { QUERY_KEYS } from '../apis/config';

export default function useCartItemList() {
  return useQuery({
    queryKey: [QUERY_KEYS.CART_ITEMS],
    queryFn: fetchCartItemList,
  });
}

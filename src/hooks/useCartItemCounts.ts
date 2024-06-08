import { useQuery } from '@tanstack/react-query';

import { getCartItemCounts } from '../apis/carItems';
import { QUERY_KEYS } from '../apis/config';

export default function useCartItemCounts() {
  return useQuery({
    queryKey: [QUERY_KEYS.CART_ITEMS_COUNTS],
    queryFn: getCartItemCounts,
  });
}

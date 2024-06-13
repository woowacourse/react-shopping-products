import { useQuery } from '@tanstack/react-query';

import { fetchCartItems } from '../../api/cartItems';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useFetchCartItems = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.cartItems],
    queryFn: () => fetchCartItems(),
  });

  return {
    ...query,
    cartItems: query.data?.content ?? [],
  };
};

export default useFetchCartItems;

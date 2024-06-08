import { useQuery } from '@tanstack/react-query';

import { getCartList } from '@/api/cartItem';

import QUERY_KEYS from '@/constants/queryKeys';
import { CartItem } from '@/types/cartItem.type';

const useFetchCartItems = () => {
  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.getCartItems],
    queryFn: getCartList,
  });

  const findCartItemByProductId = (productId: number) => {
    return data?.find((item: CartItem) => item.product.id === productId);
  };

  return {
    cartItems: data ?? [],
    isLoading,
    isFetching,
    error,
    refetch,
    findCartItemByProductId,
  };
};

export default useFetchCartItems;

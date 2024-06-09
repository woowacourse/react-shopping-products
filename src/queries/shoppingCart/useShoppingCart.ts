import { getCartItems } from '@apis/shoppingCart/shoppingCart';
import { QUERY_KEY } from '@queries/queryKey';
import { useQuery } from '@tanstack/react-query';

const useShoppingCart = () => {
  const { data, ...otherResult } = useQuery({
    queryKey: QUERY_KEY.cartItems,
    queryFn: () => getCartItems(),
    select: (data) => data.content,
  });

  return {
    ...otherResult,
    cartItems: data ?? [],
    addedShoppingCartLength: data?.length ?? 0,
  };
};

export default useShoppingCart;

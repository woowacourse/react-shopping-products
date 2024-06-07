import { getCartItems } from '@apis/shoppingCart/shoppingCart';
import { useQuery } from '@tanstack/react-query';

const useShoppingCart = () => {
  const { data } = useQuery({
    queryKey: ['cart-items'],
    queryFn: () => getCartItems(),
    select: (data) => data.content,
  });

  return {
    cartItems: data ?? [],
    addedShoppingCartLength: data?.length ?? 0,
  };
};

export default useShoppingCart;

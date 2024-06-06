import { getCartItems } from '@apis/shoppingCart/shoppingCart';
import { useQuery } from '@tanstack/react-query';

const useToggleShoppingCart = () => {
  const { data } = useQuery({
    queryKey: ['cart-items'],
    queryFn: () => getCartItems(),
    select: (data) => data.content,
  });

  const isAddedCart = (id: number) => data?.some((item) => item.product.id === id) ?? false;

  return {
    cartItems: data ?? [],
    isAddedCart,
    addedShoppingCartLength: data?.length ?? 0,
  };
};

export default useToggleShoppingCart;

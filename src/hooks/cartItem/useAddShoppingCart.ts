import { addShoppingCartItem } from '@apis/shoppingCart/shoppingCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddShoppingCart = () => {
  const queryClient = useQueryClient();

  const { mutate: addShoppingCart } = useMutation({
    mutationFn: addShoppingCartItem,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
  });

  return { addShoppingCart };
};

export default useAddShoppingCart;

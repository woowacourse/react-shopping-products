import { addShoppingCartItem } from '@apis/shoppingCart/shoppingCart';
import { QUERY_KEY } from '@queries/queryKey';

import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

const usePostShoppingCart = (
  showToast: (message: string) => void
): {
  addShoppingCart: UseMutateFunction<void, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const { mutate: addShoppingCart } = useMutation({
    mutationFn: addShoppingCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.cartItems });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return { addShoppingCart };
};

export default usePostShoppingCart;

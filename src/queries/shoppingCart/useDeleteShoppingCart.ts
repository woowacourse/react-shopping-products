import { deleteCartItem } from '@apis/shoppingCart/shoppingCart';
import { QUERY_KEY } from '@queries/queryKey';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteShoppingCart = (
  showToast: (message: string) => void
): {
  deleteShoppingCartItem: UseMutateFunction<void, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const { mutate: deleteShoppingCartItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.cartItems });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return { deleteShoppingCartItem };
};

export default useDeleteShoppingCart;

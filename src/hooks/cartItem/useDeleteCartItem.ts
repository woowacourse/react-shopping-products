import { deleteCartItem } from '@apis/shoppingCart/shoppingCart';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteCartItem = (): {
  deleteShoppingCartItem: UseMutateFunction<void, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const showToast = useToastContext();

  const { mutate: deleteShoppingCartItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return { deleteShoppingCartItem };
};

export default useDeleteCartItem;

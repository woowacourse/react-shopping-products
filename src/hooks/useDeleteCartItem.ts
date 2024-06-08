import { useMutation } from '@tanstack/react-query';
import { deleteCartItemById } from '@/api/cartItemAPI';
import { queryClient } from '@/App';
import toast from '@/services/toast';
import ERROR_MESSAGE from '@/constants/errorMessage';
import { CART_ITEM_KEYS } from '@/queries/keys';

const DEFAULT_TOAST_DURATION = 2_000;

const useDeleteCartItem = () => {
  const { mutate: deleteCartItemMutation } = useMutation<void, Error, { cartItemId: number }>({
    mutationFn: ({ cartItemId }) => deleteCartItemById(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_ITEM_KEYS.ALL });
    },
    onError: () => {
      toast.error(ERROR_MESSAGE.FAIL_DELETE_CART_ITEM, DEFAULT_TOAST_DURATION);
    },
  });

  const deleteCartItem = ({ cartItemId }: { cartItemId: number }) => {
    deleteCartItemMutation({ cartItemId });
  };

  return {
    deleteCartItem,
  };
};

export default useDeleteCartItem;

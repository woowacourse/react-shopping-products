import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteCartItem } from '@/api/cartItem';
import QUERY_KEYS from '@/constants/queryKeys';

const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: async (cartItemId: number) => {
      await deleteCartItem(cartItemId);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] }),
  });

  return {
    deleteCartItem: mutate,
    error,
  };
};

export default useDeleteCartItem;

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { patchCartItemQuantity } from '@/api/cartItem';
import QUERY_KEYS from '@/constants/queryKeys';

const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: async ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => {
      await patchCartItemQuantity({
        cartItemId,
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] });
    },
  });

  return {
    updateQuantity: mutate,
    error,
  };
};

export default useUpdateCartItemQuantity;

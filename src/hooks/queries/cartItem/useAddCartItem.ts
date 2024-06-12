import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postCartItem } from '@/api/cartItem';
import QUERY_KEYS from '@/constants/queryKeys';

const useAddCartItem = () => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: async (productId: number) => {
      await postCartItem(productId);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getCartItems] }),
  });

  return {
    addCartItem: mutate,
    error,
  };
};

export default useAddCartItem;

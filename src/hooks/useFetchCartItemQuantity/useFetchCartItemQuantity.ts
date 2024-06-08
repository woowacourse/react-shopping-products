import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCartItemQuantity } from '../../api/cartItems';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useFetchCartItemQuantity = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['updateCartItems'],
    mutationFn: patchCartItemQuantity,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });

  return {
    updateCartItemQuantity: mutate,
    isSuccess,
  };
};

export default useFetchCartItemQuantity;

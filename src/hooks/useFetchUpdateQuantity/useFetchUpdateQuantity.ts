import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchCartItemQuantity } from '../../api/cartItems';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useFetchUpdateQuantity = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
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

export default useFetchUpdateQuantity;

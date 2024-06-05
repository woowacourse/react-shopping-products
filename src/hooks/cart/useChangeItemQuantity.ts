import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { patchCartItem } from '@/api/cartItem';

const useChangeItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
};

export default useChangeItemQuantity;

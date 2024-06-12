import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';
import useToast from '../../useToast';

import { updateItemQuantity } from '@/api/cart';

const useUpdateItemQuantityQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: [CART_KEYS.updateQuantity],
    mutationFn: updateItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.fetch] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateItemQuantityQuery;

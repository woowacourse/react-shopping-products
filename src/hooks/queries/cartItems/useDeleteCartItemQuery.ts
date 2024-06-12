import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';
import useToast from '../../useToast';

import { deleteCartItem } from '@/api/cart';

const useDeleteCartItemQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: [CART_KEYS.delete],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.fetch] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useDeleteCartItemQuery;

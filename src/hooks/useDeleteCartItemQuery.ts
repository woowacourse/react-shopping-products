import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToast from './useToast';

import { deleteCartItem } from '@/api/cart';

const useDeleteCartItemQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useDeleteCartItemQuery;

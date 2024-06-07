import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToast from './useToast';

import { updateItemQuantity } from '@/api/cart';

const useUpdateItemQuantityQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: updateItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateItemQuantityQuery;

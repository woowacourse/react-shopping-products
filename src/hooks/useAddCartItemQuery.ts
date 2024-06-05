import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToast from './useToast';

import { addCartItem } from '@/api/cart';

const useAddCartItemQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useAddCartItemQuery;

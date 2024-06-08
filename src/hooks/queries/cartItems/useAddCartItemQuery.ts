import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CART_KEYS } from './queryKeys';

import { addCartItem } from '@/api/cart';

import useToast from '@/hooks/useToast';

const useAddCartItemQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: [CART_KEYS.add],
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_KEYS.fetch] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useAddCartItemQuery;

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCartItem } from '../apis/carItems';
import { QUERY_KEYS } from '../apis/config';

export default function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
  });
}

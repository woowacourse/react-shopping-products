import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchCartItem } from '../apis/carItems';
import { QUERY_KEYS } from '../apis/config';

export default function usePatchCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
  });
}

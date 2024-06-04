import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem } from '../apis/carItems';
import { QUERY_KEYS } from '../apis/config';

export default function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_ITEMS] });
    },
  });
}

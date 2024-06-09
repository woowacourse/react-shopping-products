import { deleteCartItem } from '@/api/cartItem';
import { useMutation } from '@tanstack/react-query';
import useRefetchGetCartList from '@/hooks/cart/useRefetchGetCartList';

export function useDeleteFromCartListQuery() {
  const { invalidateCartQuery } = useRefetchGetCartList();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      invalidateCartQuery();
    },
  });
}

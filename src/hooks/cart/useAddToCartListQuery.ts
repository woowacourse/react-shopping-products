import { postCartItem } from '@/api/cartItem';
import { useMutation } from '@tanstack/react-query';
import useRefetchGetCartList from '@/hooks/cart/useRefetchGetCartList';

export function useAddToCartListQuery() {
  const { invalidateCartQuery } = useRefetchGetCartList();

  return useMutation({
    mutationFn: postCartItem,
    onSuccess: () => {
      invalidateCartQuery();
    },
  });
}

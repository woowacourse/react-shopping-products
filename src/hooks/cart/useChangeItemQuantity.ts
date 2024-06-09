import { patchCartItem } from '@/api/cartItem';
import { useMutation } from '@tanstack/react-query';
import useRefetchGetCartList from '@/hooks/cart/useRefetchGetCartList';

const useChangeItemQuantity = () => {
  const { invalidateCartQuery } = useRefetchGetCartList();

  return useMutation({
    mutationFn: patchCartItem,
    onSuccess: () => {
      invalidateCartQuery();
    },
  });
};

export default useChangeItemQuantity;

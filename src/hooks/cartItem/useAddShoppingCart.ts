import { addShoppingCartItem } from '@apis/shoppingCart/shoppingCart';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

const useAddShoppingCart = (): {
  addShoppingCart: UseMutateFunction<void, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const showToast = useToastContext();

  const { mutate: addShoppingCart } = useMutation({
    mutationFn: addShoppingCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  return { addShoppingCart };
};

export default useAddShoppingCart;

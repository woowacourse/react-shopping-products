import { updateCartItemQuantity } from '@apis/shoppingCart/shoppingCart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useUpdateItemQuantity;

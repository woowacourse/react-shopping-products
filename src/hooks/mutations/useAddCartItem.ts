import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem } from '../../api/cart';

const useAddCartItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleAddCartItem = (productId: number) => mutation.mutate(productId);

  return { handleAddCartItem };
};

export default useAddCartItem;

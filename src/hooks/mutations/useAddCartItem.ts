import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem } from '../../api/cart';
import { ToastContext } from '../../context/ToastProvider';

const useAddCartItem = () => {
  const queryClient = useQueryClient();

  const { showToast } = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => showToast(error.message),
  });

  const handleAddCartItem = (productId: number) => mutation.mutate(productId);

  return { handleAddCartItem };
};

export default useAddCartItem;

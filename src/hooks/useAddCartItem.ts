import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem } from '../api';

const useAddCartItem = () => {
  const client = useQueryClient();

  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: ['addCartItem'],
    mutationFn: addCartItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['cartItems'],
      });
    },
  });

  return {
    addCartItem: mutate,
    isAddCartItemError: isError,
    isAddCartItemSuccess: isSuccess,
  };
};

export default useAddCartItem;

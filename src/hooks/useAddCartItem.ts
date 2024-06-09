import { useMutation } from '@tanstack/react-query';
import { addCartItem } from '../api';

const useAddCartItem = () => {
  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: ['addCartItem'],
    mutationFn: addCartItem,
  });

  return {
    addCartItem: mutate,
    isAddCartItemError: isError,
    isAddCartItemSuccess: isSuccess,
  };
};

export default useAddCartItem;

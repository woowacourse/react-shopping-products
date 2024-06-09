import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem } from '../api';
import { MUTATION_KEY, QUERY_KEY } from '../constant/queryKey';

const useAddCartItem = () => {
  const client = useQueryClient();

  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: [MUTATION_KEY.ADD_CART_ITEM],
    mutationFn: addCartItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QUERY_KEY.CART_ITEMS],
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

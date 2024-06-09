import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchToDeleteCartItem,
  postAddItems,
  patchCartQuantity,
} from '../api/carts';

const useMutateCart = () => {
  const queryClient = useQueryClient();

  const { mutate: addProductToCart } = useMutation({
    mutationFn: postAddItems,
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const { mutate: deleteToRemoveCart } = useMutation({
    mutationFn: fetchToDeleteCartItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  const { mutate: patchCartItemQuantity } = useMutation({
    mutationFn: patchCartQuantity,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    addProductToCart,
    deleteToRemoveCart,
    patchCartItemQuantity,
  };
};

export default useMutateCart;

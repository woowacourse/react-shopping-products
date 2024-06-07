import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postAddItems } from '../api/products';

const useFetchAddCart = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['addCartItems'],
    mutationFn: postAddItems,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
  });

  return {
    addCartItem: mutate,
  };
};

export default useFetchAddCart;

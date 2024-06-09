import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postAddItems } from '../../api/products';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useFetchAddCart = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: postAddItems,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });

  return {
    addCartItem: mutate,
    isSuccess,
  };
};

export default useFetchAddCart;

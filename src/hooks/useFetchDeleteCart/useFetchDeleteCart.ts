import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteItem } from '../../api/products';

const useFetchDeleteCart = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['deleteCartItems'],
    mutationFn: deleteItem,
    // onMutate() {
    //   /* ... */
    // },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['delete-cart-item'] });
    },
    // onError(err) {
    //   console.log(err);
    // },
    // onSettled() {
    //   /* finally와 같은 역할 */
    // },
  });

  return {
    addCartItem: mutate,
    // isPending,
    // isError,
  };
};

export default useFetchDeleteCart;

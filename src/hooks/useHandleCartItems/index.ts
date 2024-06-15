import { useQueryClient } from '@tanstack/react-query';
import {
  useAddCartMutation,
  useDeleteCartMutation,
  useUpdateCartItemQuantity,
} from '../queries/cartItems/mutation';

const useHandleCartItems = () => {
  const queryClient = useQueryClient();

  const addCart = useAddCartMutation(queryClient);
  const deleteCart = useDeleteCartMutation(queryClient);
  const updateCartItemQuantity = useUpdateCartItemQuantity(queryClient);

  return { addCart, deleteCart, updateCartItemQuantity };
};

export default useHandleCartItems;

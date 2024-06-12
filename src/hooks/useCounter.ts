import useDeleteCartItemQuery from './queries/cartItems/useDeleteCartItemQuery';
import useUpdateItemQuantityQuery from './queries/cartItems/useUpdateItemQuantityQuery';

import { CartItemInfo } from '@/types/cartItem';

const useCounter = (cartItem: CartItemInfo) => {
  const { mutate: updateItemQuantity, isPending: isUpdatePending } = useUpdateItemQuantityQuery();
  const { mutate: deleteCartItem, isPending: isDeletePending } = useDeleteCartItemQuery();

  const handleDecrementQuantity = async () => {
    const newQuantity = cartItem.quantity - 1;

    if (newQuantity <= 0) {
      deleteCartItem(cartItem.id);
      return;
    }

    updateItemQuantity({ cartId: cartItem.id, quantity: newQuantity });
  };

  const handleIncrementQuantity = async () => {
    const newQuantity = cartItem.quantity + 1;
    updateItemQuantity({ cartId: cartItem.id, quantity: newQuantity });
  };

  return { handleDecrementQuantity, handleIncrementQuantity, isUpdatePending, isDeletePending };
};

export default useCounter;

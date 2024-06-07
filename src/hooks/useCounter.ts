import useDeleteCartItemQuery from './useDeleteCartItemQuery';
import useUpdateItemQuantityQuery from './useUpdateItemQuantityQuery';

import { CartItemInfo } from '@/types/cartItem';

const useCounter = (item: CartItemInfo) => {
  const { mutate: updateItemQuantity } = useUpdateItemQuantityQuery();
  const { mutate: deleteCartItem } = useDeleteCartItemQuery();

  const handleDecrementQuantity = async () => {
    const newQuantity = item.quantity - 1;

    if (newQuantity <= 0) {
      deleteCartItem(item.id);
      return;
    }

    updateItemQuantity({ cartId: item.id, quantity: newQuantity });
  };

  const handleIncrementQuantity = async () => {
    const newQuantity = item.quantity + 1;
    updateItemQuantity({ cartId: item.id, quantity: newQuantity });
  };

  return { handleDecrementQuantity, handleIncrementQuantity };
};

export default useCounter;

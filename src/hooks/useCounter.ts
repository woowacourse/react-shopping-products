import useUpdateItemQuantityQuery from './useUpdateItemQuantityQuery';

import { CartItemInfo } from '@/types/cartItem';

const useCounter = (item: CartItemInfo) => {
  const { mutate: updateItemQuantity } = useUpdateItemQuantityQuery();

  const handleDecrementQuantity = async () => {
    const newQuantity = Math.max(item.quantity - 1, 1);
    updateItemQuantity({ cartId: item.id, quantity: newQuantity });
  };

  const handleIncrementQuantity = async () => {
    const newQuantity = item.quantity + 1;
    updateItemQuantity({ cartId: item.id, quantity: newQuantity });
  };

  return { handleDecrementQuantity, handleIncrementQuantity };
};

export default useCounter;

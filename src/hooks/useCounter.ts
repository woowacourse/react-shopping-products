import { useState } from 'react';

import { updateItemQuantity } from '@/api/cart';
import { CartItemInfo } from '@/types/cartItem';

const useCounter = (item: CartItemInfo) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDecrementQuantity = async () => {
    try {
      setIsLoading(true);
      const newQuantity = Math.max(item.quantity - 1, 1);
      const { status } = await updateItemQuantity(item.id, newQuantity);

      //   if (status === 200) {
      //     setCartItems((prevItems) =>
      //       prevItems.map((cartItem) =>
      //         cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem,
      //       ),
      //     );
      //   }
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrementQuantity = async () => {
    try {
      setIsLoading(true);
      const newQuantity = item.quantity + 1;
      const { status } = await updateItemQuantity(item.id, newQuantity);

      //   if (status === 200) {
      //     setCartItems((prevItems) =>
      //       prevItems.map((cartItem) =>
      //         cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      //       ),
      //     );
      //   }
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleDecrementQuantity, handleIncrementQuantity };
};

export default useCounter;

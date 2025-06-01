import { useEffect } from 'react';

import { useCartRequest } from './useCartRequest';
export const useCart = () => {

  const { refetch, addToCart, increaseQuantity, decreaseQuantity, deleteFromCart } =
    useCartRequest();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
  };
};

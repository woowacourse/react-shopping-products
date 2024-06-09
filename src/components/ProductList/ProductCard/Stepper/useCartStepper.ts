import React, { useCallback } from 'react';
import { CartItem } from '../../../../types/fetch';
import useMutateCart from '../../../../hooks/useMutateCart';

const useCartStepper = (cartItem?: CartItem) => {
  const { deleteToRemoveCart, patchCartItemQuantity } = useMutateCart();

  const handleClickDecrease = useCallback(() => {
    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      deleteToRemoveCart(cartItem.id);
      return;
    }

    patchCartItemQuantity({
      cartId: cartItem.id,
      quantity: cartItem.quantity - 1,
    });
  }, [cartItem]);

  const handleClickIncrease = useCallback(() => {
    if (!cartItem) return;
    patchCartItemQuantity({
      cartId: cartItem.id,
      quantity: cartItem.quantity + 1,
    });
  }, [cartItem]);

  return { handleClickDecrease, handleClickIncrease };
};

export default useCartStepper;

import { useCallback, useEffect, useState } from 'react';
import { CartItem } from '../../../types/fetch';
import useFetchCart from '../../../hooks/useFetchCart';

const useCartStepper = (cartItem?: CartItem, minValue = 0, deleteCartUnderMin = true) => {
  const { deleteToRemoveCart, patchCartItemQuantity } = useFetchCart();

  const [isMinusButtonActive, setIsMinusButtonActive] = useState(true);
  useEffect(() => {
    if (!cartItem) return;
    setIsMinusButtonActive(cartItem.quantity > minValue);
  }, [setIsMinusButtonActive, cartItem, minValue]);

  const handleClickDecrease = useCallback(() => {
    if (!cartItem) return;
    if (cartItem.quantity === minValue) return;

    if (cartItem.quantity === minValue && deleteCartUnderMin) {
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

  return { handleClickDecrease, handleClickIncrease, isMinusButtonActive };
};

export default useCartStepper;

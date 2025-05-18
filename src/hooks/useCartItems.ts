import { addCartItems, removeCartItems } from '../services/cartItemServices';
import tryApiCall from '../util/tryApiCall';
import type { CartItemType } from '../types/data';
import { useState, useEffect } from 'react';
import { getCartItems } from '../services/cartItemServices';

const useCartItems = ({
  handleErrorMessage,
}: {
  handleErrorMessage: (errorMessage: string) => void;
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    (async () => {
      setCartItems(await tryApiCall(async () => await getCartItems(), handleErrorMessage));
    })();
  }, [handleErrorMessage]);

  const handleAddCartItems = (productId: number) => {
    const addCartItemInfo = {
      productId: productId,
      quantity: 1,
    };
    (async () => {
      await tryApiCall(async () => await addCartItems(addCartItemInfo), handleErrorMessage);
      setCartItems(await tryApiCall(async () => await getCartItems(), handleErrorMessage));
    })();
  };

  const handleRemoveCartItems = (productId: number) => {
    const removeItemCartId = cartItems.find((cartItem) => cartItem.product.id === productId)?.id;

    if (removeItemCartId) {
      (async () => {
        await tryApiCall(async () => await removeCartItems(removeItemCartId), handleErrorMessage);
        setCartItems(await tryApiCall(async () => await getCartItems(), handleErrorMessage));
      })();
    }
  };

  return { cartItems, handleAddCartItems, handleRemoveCartItems };
};

export default useCartItems;

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
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const items = await tryApiCall(getCartItems, handleErrorMessage);
    setCartItems(items);
  };

  const handleAddCartItems = async (productId: number) => {
    const addCartItemInfo = {
      productId: productId,
      quantity: 1,
    };
    await tryApiCall(async () => await addCartItems(addCartItemInfo), handleErrorMessage);
    setCartItems(await tryApiCall(async () => await getCartItems(), handleErrorMessage));
  };

  const handleRemoveCartItems = async (productId: number) => {
    const removeItemCartId = cartItems.find((cartItem) => cartItem.product.id === productId)?.id;

    if (removeItemCartId) {
      await tryApiCall(async () => await removeCartItems(removeItemCartId), handleErrorMessage);
      setCartItems(await tryApiCall(async () => await getCartItems(), handleErrorMessage));
    }
  };

  return { cartItems, handleAddCartItems, handleRemoveCartItems };
};

export default useCartItems;

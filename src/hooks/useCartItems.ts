import {
  addCartItems,
  removeCartItems,
  updateCartItemQuantity,
} from '../services/cartItemServices';
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
    const items = await tryApiCall<CartItemType[]>(getCartItems, handleErrorMessage);
    if (!items) return;

    setCartItems(items);
  };

  const handleAddCartItems = async (productId: number) => {
    const addCartItemInfo = {
      productId: productId,
      quantity: 1,
    };
    await tryApiCall(async () => await addCartItems(addCartItemInfo), handleErrorMessage);
    const items = await tryApiCall<CartItemType[]>(
      async () => await getCartItems(),
      handleErrorMessage,
    );
    if (!items) return;

    setCartItems(items);
  };

  const handleRemoveCartItems = async (productId: number) => {
    const removeItemCartId = cartItems.find((cartItem) => cartItem.product.id === productId)?.id;

    if (removeItemCartId) {
      await tryApiCall(async () => await removeCartItems(removeItemCartId), handleErrorMessage);
      const items = await tryApiCall<CartItemType[]>(
        async () => await getCartItems(),
        handleErrorMessage,
      );
      if (!items) return;

      setCartItems(items);
    }
  };

  const handleUpdateCartItems = async (productId: number, quantity: number) => {
    const updateCartItemInfo = {
      quantity: quantity,
    };
    await tryApiCall(
      async () => await updateCartItemQuantity(productId, updateCartItemInfo),
      handleErrorMessage,
    );

    const items = await tryApiCall<CartItemType[]>(
      async () => await getCartItems(),
      handleErrorMessage,
    );
    if (!items) return;

    setCartItems(items);
  };

  return { cartItems, handleAddCartItems, handleRemoveCartItems, handleUpdateCartItems };
};

export default useCartItems;

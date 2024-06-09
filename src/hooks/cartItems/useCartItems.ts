import { useState, useEffect } from "react";

import { addCartItem, removeCartItem } from "../../apis";
import { useGetCartItems, useUpdateCartItem } from "./queries";
import { ERROR_MESSAGE } from "../../constants";

interface UseCartItemResult {
  error: unknown;
  isLoading: boolean;
  selectedCartItemsLength: number;
  handleAddCartItem: (id: number) => Promise<void>;
  handleRemoveCartItem: (id: number) => Promise<void>;
  checkIsInCart: (productId: number) => boolean;
}

export default function useCartItems(): UseCartItemResult {
  const [error, setError] = useState<unknown>(null);

  const {
    data: cartItems = [],
    isLoading: isCartItemsLoading,
    isError: isCartItemsError,
    error: cartItemsError,
  } = useGetCartItems();

  const addProductToCart = useUpdateCartItem(addCartItem);
  const removeProductFromCart = useUpdateCartItem(removeCartItem);

  const isLoading =
    isCartItemsLoading || addProductToCart.isPending || removeProductFromCart.isPending;

  useEffect(() => {
    if (isCartItemsError || addProductToCart.isError || removeProductFromCart.isError) {
      const error = cartItemsError || addProductToCart.error || removeProductFromCart.error;
      setError(error);
      return;
    }

    setError(null);
  }, [isCartItemsError, cartItemsError, addProductToCart, removeProductFromCart]);

  const handleAddCartItem = async (productId: number) => {
    addProductToCart.mutate(productId, {
      onError: (error) => setError(error),
    });
  };

  const handleRemoveCartItem = async (productId: number) => {
    const targetCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);

    if (!targetCartItem) {
      setError(new Error(ERROR_MESSAGE.INVALID_PRODUCT));
      return;
    }

    removeProductFromCart.mutate(targetCartItem.id, {
      onError: (error) => setError(error),
    });
  };

  const checkIsInCart = (productId: number) => {
    return cartItems.some((cartItem) => cartItem.product.id === productId);
  };

  return {
    error,
    isLoading,
    selectedCartItemsLength: cartItems.length ?? 0,
    handleAddCartItem,
    handleRemoveCartItem,
    checkIsInCart,
  };
}

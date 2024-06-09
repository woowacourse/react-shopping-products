import { useState, useEffect } from "react";

import { addCartItem, removeCartItem, updateCartItemQuantity } from "../../apis";
import { useGetCartItems, useUpdateCartItem } from "./queries";
import { ERROR_MESSAGE } from "../../constants";
import { UpdateCartItemQuantityProps } from "../../types";

interface UseCartItemResult {
  error: unknown;
  isLoading: boolean;
  selectedCartItemsLength: number;
  handleAddCartItem: (id: number) => Promise<void>;
  handleRemoveCartItem: (id: number) => Promise<void>;
  // checkIsInCart: (productId: number) => boolean;
  getQuantityByProductId: (productId: number) => number;
  updateQuantityByProductId: (productId: number, quantity: number) => Promise<void>;
}

export default function useCartItems(): UseCartItemResult {
  const [error, setError] = useState<unknown>(null);

  const {
    data: cartItems = [],
    isLoading: isCartItemsLoading,
    isError: isCartItemsError,
    error: cartItemsError,
  } = useGetCartItems();

  const addProductToCart = useUpdateCartItem<number>(addCartItem);
  const removeProductFromCart = useUpdateCartItem<number>(removeCartItem);
  const updateProductQuantity =
    useUpdateCartItem<UpdateCartItemQuantityProps>(updateCartItemQuantity);

  const isLoading =
    isCartItemsLoading ||
    addProductToCart.isPending ||
    removeProductFromCart.isPending ||
    updateProductQuantity.isPending;

  useEffect(() => {
    if (
      isCartItemsError ||
      addProductToCart.isError ||
      removeProductFromCart.isError ||
      updateProductQuantity.isError
    ) {
      const error =
        cartItemsError ||
        addProductToCart.error ||
        removeProductFromCart.error ||
        updateProductQuantity.error;
      setError(error);
      return;
    }

    setError(null);
  }, [
    isCartItemsError,
    cartItemsError,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
  ]);

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

  // const checkIsInCart = (productId: number) => {
  //   return cartItems.some((cartItem) => cartItem.product.id === productId);
  // };

  const getQuantityByProductId = (productId: number) => {
    const targetCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);
    return targetCartItem ? targetCartItem.quantity : 0;
  };

  const updateQuantityByProductId = async (productId: number, quantity: number) => {
    const targetCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);

    if (!targetCartItem) {
      setError(new Error(ERROR_MESSAGE.INVALID_PRODUCT));
      return;
    }

    updateProductQuantity.mutate(
      { cartItemId: targetCartItem.id, quantity },
      { onError: (error) => setError(error) },
    );
  };

  return {
    error,
    isLoading,
    selectedCartItemsLength: cartItems.length ?? 0,
    handleAddCartItem,
    handleRemoveCartItem,
    // checkIsInCart,
    getQuantityByProductId,
    updateQuantityByProductId,
  };
}

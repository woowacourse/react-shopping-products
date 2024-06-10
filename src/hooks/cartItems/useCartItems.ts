import { useState, useEffect } from "react";

import { addCartItem, removeCartItem } from "../../apis";
import { useGetCartItems, useUpdateCartItem } from "./queries";
import { ERROR_MESSAGE } from "../../constants";
import { CartItem } from "../../types";

interface UseCartItemResult {
  cartItems: CartItem[];
  error: unknown;
  isLoading: boolean;
  handleAddCartItem: (id: number) => Promise<void>;
  handleRemoveCartItem: (id: number) => Promise<void>;
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

  return {
    cartItems,
    error,
    isLoading,
    handleAddCartItem,
    handleRemoveCartItem,
  };
}

import { useEffect } from "react";

import { addCartItem, removeCartItem } from "../../apis";
import { useGetCartItems, useUpdateCartItem } from "./queries";
import { useErrorContext } from "../../hooks";
import { ERROR_MESSAGE } from "../../constants";
import { CartItem } from "../../types";

interface UseCartItemResult {
  cartItems: CartItem[];
  isLoading: boolean;
  handleAddCartItem: (id: number) => Promise<void>;
  handleRemoveCartItem: (id: number) => Promise<void>;
}

export default function useCartItems(): UseCartItemResult {
  const {
    data: cartItems = [],
    isLoading: isCartItemsLoading,
    isError: isCartItemsError,
    error: cartItemsError,
  } = useGetCartItems();

  const addProductToCart = useUpdateCartItem<number>(addCartItem);
  const removeProductFromCart = useUpdateCartItem<number>(removeCartItem);

  const { setError } = useErrorContext();

  const isLoading =
    isCartItemsLoading || addProductToCart.isPending || removeProductFromCart.isPending;

  useEffect(() => {
    if (isCartItemsError) {
      setError(cartItemsError);
    }
  }, [isCartItemsError, cartItemsError, setError]);

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
    isLoading,
    handleAddCartItem,
    handleRemoveCartItem,
  };
}

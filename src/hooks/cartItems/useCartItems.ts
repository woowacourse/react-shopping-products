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
  const { data: cartItems = [], isLoading, isError, error } = useGetCartItems();

  const addProductToCart = useUpdateCartItem<number>(addCartItem);
  const removeProductFromCart = useUpdateCartItem<number>(removeCartItem);

  const { setError } = useErrorContext();

  useEffect(() => {
    if (isError) {
      setError(error);
      return;
    }

    setError(null);
  }, [isError, error, setError]);

  const handleAddCartItem = async (productId: number) => {
    addProductToCart.mutate(productId);
  };

  const handleRemoveCartItem = async (productId: number) => {
    const targetCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);

    if (!targetCartItem) {
      setError(new Error(ERROR_MESSAGE.CART_ITEMS.ITEM_NOT_FOUND));
      return;
    }

    removeProductFromCart.mutate(targetCartItem.id);
  };

  return {
    cartItems,
    isLoading: isLoading || addProductToCart.isPending || removeProductFromCart.isPending,
    handleAddCartItem,
    handleRemoveCartItem,
  };
}

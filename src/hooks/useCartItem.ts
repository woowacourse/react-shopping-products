import { useState, useEffect } from "react";
import { CartItem } from "../types/cartItem";
import { addCartItem, removeCartItem, getCartItems } from "../apis/cart-item";

interface UseCartItemResult {
  error: unknown;
  isLoading: boolean;
  selectedCartItemsLength: number;
  handleAddCartItem: (id: number) => Promise<void>;
  handleRemoveCartItem: (id: number) => Promise<void>;
  checkIsInCart: (productId: number) => boolean;
}

export default function useCartItem(): UseCartItemResult {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCartItem();
  }, []);

  const fetchCartItem = async () => {
    try {
      setIsLoading(true);

      const totalItemCount = (await getCartItems()).totalElements;
      const cartItems = await getCartItems(totalItemCount);

      setCartItems(cartItems.content);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCartItem = async (productId: number) => {
    try {
      setIsLoading(true);
      await addCartItem(productId);
      fetchCartItem();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCartItem = async (productId: number) => {
    try {
      setIsLoading(true);

      const targetCartItem = cartItems.find((item) => item.product.id === productId);

      if (!targetCartItem) {
        setIsLoading(false);
        setError(new Error("존재하지 않는 상품입니다."));
        return;
      }

      await removeCartItem(targetCartItem.id);
      fetchCartItem();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCartItemsLength = cartItems.length;

  const checkIsInCart = (productId: number) => {
    return cartItems.some((cartItem) => cartItem.product.id === productId);
  };

  return {
    error,
    isLoading,
    selectedCartItemsLength,
    handleAddCartItem,
    handleRemoveCartItem,
    checkIsInCart,
  };
}

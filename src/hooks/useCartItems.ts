import { useEffect, useState } from "react";
import { getCartItems, addCartItem, removeCartItem } from "../api/cart";

interface UseCartItemsResult {
  cartItemsCount: number;
  isLoading: boolean;
  handleAddCartItem: (id: number) => void;
  handleRemoveCartItem: (id: number) => void;
  isProductInCart: (id: number) => boolean;
}

const useCartItems = (): UseCartItemsResult => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCartItem();
  }, []);

  const fetchCartItem = async () => {
    try {
      setIsLoading(true);

      const cartItems = await getCartItems();

      setCartItems(cartItems);
    } catch (error) {
      console.error("Error fetch cart :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCartItem = async (id: number) => {
    try {
      setIsLoading(true);

      await addCartItem(id);
      fetchCartItem();
    } catch (error) {
      console.error("Error handling cart action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCartItem = async (id: number) => {
    try {
      setIsLoading(true);

      const cart = cartItems.find((cartItem) => cartItem.product.id === id);

      if (!cart) {
        setIsLoading(false);
        return;
      }

      await removeCartItem(cart.id);
      fetchCartItem();
    } catch (error) {
      console.error("Error handling cart action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isProductInCart = (productId: number) => {
    return cartItems.some((cartItem) => cartItem.product.id === productId);
  };

  return {
    cartItemsCount: cartItems.length,
    isLoading,
    handleAddCartItem,
    handleRemoveCartItem,
    isProductInCart,
  };
};

export default useCartItems;

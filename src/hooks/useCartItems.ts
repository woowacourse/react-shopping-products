import { useState, useEffect } from 'react';
import { fetchCartItems, deleteCartItem, addCartItem } from '../api/cart';
import { CartItem } from '../types/CartItem.type';

interface UseCartItemsResult {
  cartItems: CartItem[];
  counts: number;
  loading: boolean;
  error: unknown;
  handleAddCartItem: (productId: number) => Promise<void>;
  handleDeleteCartItem: (productId: number) => Promise<void>;
}

export default function useCartItems(): UseCartItemsResult {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const data = await fetchCartItems();
      setCartItems(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCartItem = async (productId: number) => {
    await addCartItem(productId);
    getCartItems();
  };

  const handleDeleteCartItem = async (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);

    if (cartItem) {
      await deleteCartItem(cartItem.id);
      getCartItems();
    }
  };

  return {
    cartItems,
    counts: cartItems.length,
    loading,
    error,
    handleAddCartItem,
    handleDeleteCartItem,
  };
}

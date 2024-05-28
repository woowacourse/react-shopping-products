import { useState, useEffect } from 'react';
import { fetchCartItems } from '../api/cart';
import { CartItem } from '../types/CartItem.type';

interface UseCartItemsResult {
  counts: number;
  loading: boolean;
  error: unknown;
}

export default function useCartItems(): UseCartItemsResult {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const data = await fetchCartItems();
        setCartItems((prevCartItems) => [...prevCartItems, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, []);

  return { counts: cartItems.length, loading, error };
}

import { useEffect, useState } from 'react';

import { CartItem } from '@/shared';
import { cartItemsAPI } from '@/shared/api/cart-items/cartItemsAPI';

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await cartItemsAPI.get({});
        setCartItems(response.content);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return { cartItems, loading, error };
};

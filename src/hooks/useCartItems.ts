import { useState } from 'react';

import { fetchAddCartItem, fetchDeleteCartItem, fetchCartItems } from '../api/cartItems';

import { CartItem } from '../types/cart';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const getCartItems = async () => {
    try {
      setLoading(true);
      const fetchedCartItems = await fetchCartItems();

      setCartItems(fetchedCartItems);
    } catch (error) {
      setError(error);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const addCartItem = async (productId: number) => {
    try {
      await fetchAddCartItem(productId);

      await getCartItems();
    } catch (error) {
      setError(error);
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteCartItem = async (cartId: number) => {
    try {
      await fetchDeleteCartItem(cartId);

      await getCartItems();
    } catch (error) {
      setError(error);
      setTimeout(() => setError(null), 3000);
    }
  };

  return {
    cartItems,
    getCartItems,
    addCartItem,
    deleteCartItem,
    cartItemsLoading: loading,
    cartItemsError: error,
  };
};

export default useCartItems;

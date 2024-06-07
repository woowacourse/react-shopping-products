import { useState } from 'react';

import { fetchAddCartItem, fetchDeleteCartItem, fetchCartItems } from '../api/cartItems';

import { CartItem } from '../types/cart';
import { MAX_CART_ITEMS_SIZE } from '../constants/pagination';

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
      if (cartItems.length >= MAX_CART_ITEMS_SIZE) {
        throw new Error('Because cart items exceed max count, Failed to add cart Item');
      }

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

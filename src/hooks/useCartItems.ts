import { useEffect, useContext, useState } from 'react';

import { fetchAddCartItem, fetchDeleteCartItem, fetchCartItems } from '../api/cartItems';
import { CartItemContext } from '../App';

const useCartItems = () => {
  const { cartItems, setCartItems } = useContext(CartItemContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const getCartItems = async () => {
    try {
      setLoading(true);
      const fetchedCartItems = await fetchCartItems();

      setCartItems(fetchedCartItems);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const addCartItem = async (productId: number) => {
    try {
      await fetchAddCartItem(productId);

      await getCartItems();
    } catch (error) {
      setError(error);
    }
  };

  const deleteCartItem = async (cartId: number) => {
    try {
      await fetchDeleteCartItem(cartId);

      await getCartItems();
    } catch (error) {
      setError(error);
    }
  };

  return {
    cartItems,
    addCartItem,
    deleteCartItem,
    CartItemsLoading: loading,
    CartItemsError: error,
  };
};

export default useCartItems;

import { useEffect, useContext, useState } from 'react';

import { addCartItem, deleteCartItem, fetchCartItems } from '../api/cartItems';
import { CartItemContext } from '../App';

const useCart = () => {
  const { cartItems, setCartItems } = useContext(CartItemContext);

  const [isInCarts, setIsInCarts] = useState<number[]>([]);
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

  const addCart = async (productId: number) => {
    try {
      await addCartItem(productId);

      setIsInCarts((prevIsInCarts) => [...prevIsInCarts, productId]);
      await getCartItems();
    } catch (error) {
      setError(error);
    }
  };

  const deleteCart = async (cartId: number) => {
    const filteredIsInCarts = isInCarts.filter((id) => id !== cartId);

    try {
      await deleteCartItem(cartId);

      setIsInCarts(filteredIsInCarts);
      await getCartItems();
    } catch (error) {
      setError(error);
    }
  };

  return {
    cartItems,
    isInCarts,
    addCart,
    deleteCart,
    CartItemsLoading: loading,
    CartItemsError: error,
  };
};

export default useCart;

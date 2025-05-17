import { useState } from 'react';
import { Product, CartItem } from '../App';
import getCartItems from '../api/getCartItems';
import postCartItems from '../api/postCartItems';
import deleteCartItems from '../api/deleteCartItems';

type ErrorState = {
  isError: boolean;
  status: number | null;
};

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({
    isError: false,
    status: null,
  });

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await getCartItems();
      setCartItems(data.content);
      setError({ isError: false, status: Number(status) });
    } catch (e) {
      if (e instanceof Error) {
        setError({ isError: true, status: Number(e.message) });
      } else {
        setError({ isError: true, status: null });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    try {
      const { status } = await postCartItems(product);
      await fetchCartItems();
      setError({ isError: false, status });
    } catch (e) {
      if (e instanceof Error) {
        setError({ isError: true, status: Number(e.message) });
      } else {
        setError({ isError: true, status: null });
      }
    }
  };

  const removeFromCart = async (productId: number) => {
    const targetCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );

    if (!targetCartItem) {
      setError({
        isError: true,
        status: 404,
      });
      return;
    }

    try {
      const { status } = await deleteCartItems(targetCartItem.id);
      await fetchCartItems();
      setError({ isError: false, status });
    } catch (e) {
      if (e instanceof Error) {
        setError({ isError: true, status: Number(e.message) });
      } else {
        setError({ isError: true, status: null });
      }
    }
  };

  return {
    cartItems,
    isLoading,
    error,
    fetchCartItems,
    addToCart,
    removeFromCart,
  };
};

export default useCartItems;

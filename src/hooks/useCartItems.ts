import { useState } from 'react';
import { Product, CartItem } from '../App';
import getCartItems from '../api/getCartItems';
import postCartItems from '../api/postCartItems';
import deleteCartItems from '../api/deleteCartItems';

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await getCartItems();
      setCartItems(data.content);
      setErrorMessage('');
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage('알 수 없는 에러가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    try {
      await postCartItems(product);
      await fetchCartItems();
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await deleteCartItems(productId);
      await fetchCartItems();
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  return {
    cartItems,
    isLoading,
    errorMessage,
    fetchCartItems,
    addToCart,
    removeFromCart,
  };
};

export default useCartItems;

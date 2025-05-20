import { useState, useEffect, useCallback } from 'react';
import { getCartItems, postCartItems, deleteCartItem } from '../api/cartItems';
import { useError } from '../context/ErrorContext';
import { ERROR_MSG } from '../constants/errorMessage';

export type CartProductIds = {
  productId: number;
  cartId: number;
};

export const useFetchCartItems = () => {
  const [cartProductsIds, setCartProductsIds] = useState<CartProductIds[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessage, setErrorMessage, clearErrorMessage } = useError();

  const fetchCartItems = useCallback(async () => {
    try {
      setIsLoading(true);
      clearErrorMessage();

      const data = await getCartItems();
      const mapped: CartProductIds[] = data.map((item) => ({
        productId: item.product.id,
        cartId: item.id,
      }));
      setCartProductsIds(mapped);
    } catch (error) {
      console.error(ERROR_MSG.CART_FETCH_FAIL, error);
      setErrorMessage(ERROR_MSG.CART_FETCH_FAIL);
    } finally {
      setIsLoading(false);
    }
  }, [clearErrorMessage, setErrorMessage]);

  const addToCart = async (productId: number) => {
    try {
      await postCartItems(productId);
      fetchCartItems();
    } catch (error) {
      console.error(ERROR_MSG.CART_ADD_FAIL, error);
      setErrorMessage(ERROR_MSG.CART_ADD_FAIL);
      throw error;
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      await deleteCartItem(cartId);
      fetchCartItems();
    } catch (error) {
      console.error(ERROR_MSG.CART_REMOVE_FAIL, error);
      setErrorMessage(ERROR_MSG.CART_REMOVE_FAIL);
      throw error;
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return {
    data: cartProductsIds,
    isLoading,
    error: errorMessage,
    addToCart,
    removeFromCart,
  };
};

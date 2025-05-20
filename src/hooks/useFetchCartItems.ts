import { useState, useEffect } from 'react';
import { getCartItems } from '../api/cartItems';
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

  useEffect(() => {
    const fetchCartItems = async () => {
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
    };
    fetchCartItems();
  }, [clearErrorMessage, setErrorMessage]);

  return {
    data: cartProductsIds,
    isLoading,
    error: errorMessage,
  };
};

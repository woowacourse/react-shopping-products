import { useCallback, useEffect, useState } from 'react';
import { getCartItem } from '../api/fetchCart';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { CartItem, ErrorType } from '../types/type';

export const useCartList = () => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({
    isError: false,
    errorMessage: '',
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError({ isError: false, errorMessage: '' });
    try {
      const data = await getCartItem({
        page: 0,
        size: 50,
        sortBy: 'desc',
      });
      setCartList(data.content);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        errorMessage: ERROR_MESSAGE.CART_FETCH_FAIL,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    cartList,
    isLoading,
    error,
    fetchData,
  };
};

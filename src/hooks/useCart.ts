import { useState, useEffect, useCallback } from 'react';
import { CartProduct } from '../types';
import { CART_URL } from '../constants/endpoint';
import { USER_TOKEN } from '../constants/env';
import useError from './useError';
import useFetch from './useFetch';

export default function useCart() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { fetchData, loading } = useFetch();
  const { showError } = useError();

  const fetchCartProducts = useCallback(async () => {
    try {
      const data = await fetchData(CART_URL, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
        method: 'GET',
      });
      setCartProducts(data.content);
    } catch (error) {
      if (error instanceof Error) showError(error.message);
    }
  }, [fetchData, showError]);

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return { cartProducts, fetchCartProducts, loading };
}

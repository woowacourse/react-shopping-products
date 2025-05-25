import { useState, useEffect, useCallback } from 'react';
import { CartProduct } from '../types';
import { CART_URL } from '../constants/endpoint';
import { USER_TOKEN } from '../constants/env';
import useError from './useError';
import useFetch from './useFetch';
import { addCart, removeCart } from '../utils/api';
import patchCart from '../utils/api/patchCart';
import ERROR_MESSAGE from '../constants/ERROR_MESSAGE';

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

  const handleCartProducts = useCallback(
    async (keyword: 'add' | 'remove' | 'patch', options: { id: number; quantity?: number }) => {
      switch (keyword) {
        case 'add': {
          try {
            await addCart(options.id);
            await fetchCartProducts();
          } catch (error) {
            if (error instanceof Error) showError(error.message);
          }
          break;
        }
        case 'remove': {
          try {
            await removeCart(options.id);
            await fetchCartProducts();
          } catch (error) {
            if (error instanceof Error) showError(error.message);
          }
          break;
        }
        case 'patch': {
          try {
            if (options.quantity === undefined) throw new Error(ERROR_MESSAGE.PATCH_CART);
            await patchCart(options.id, options.quantity);
            await fetchCartProducts();
          } catch (error) {
            if (error instanceof Error) showError(error.message);
          }
          break;
        }
        default:
          break;
      }
    },
    [fetchCartProducts, showError]
  );

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return { cartProducts, handleCartProducts, loading };
}

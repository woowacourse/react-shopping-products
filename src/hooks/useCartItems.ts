import { useEffect, useState } from 'react';
import { CartItem, Product } from '../App';
import getCartItems from '../api/getCartItems';
import postCartItems from '../api/postCartItems';
import deleteCartItems from '../api/deleteCartItems';
import patchCartItems from '../api/patchCartItems';
import { useDataContext } from '../components/contexts/dataContext';
import useFetcherOnly from './useFetchOnly';

const useCartItems = () => {
  const key = 'cartItems';
  const { data: contextData, setData } = useDataContext();

  const {
    data: fetchedCartItems,
    isLoading,
    error,
    refetch: fetchCartItems,
  } = useFetcherOnly<CartItem>({
    fetcher: getCartItems,
    enabled: !contextData[key],
  });

  const [isFetching, setIsFetching] = useState(false);

  const cartItems = contextData[key]?.data ?? [];

  useEffect(() => {
    if (fetchedCartItems) {
      setData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          data: fetchedCartItems,
        },
      }));
    }
  }, [fetchedCartItems, key, setData]);

  const handleError = (status: number | null) => {
    setData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isLoading: false,
        error: {
          isError: true,
          status,
        },
      },
    }));
  };

  const addToCart = async (product: Product) => {
    if (isFetching) return;

    try {
      setIsFetching(true);
      await postCartItems(product);
      fetchCartItems();
    } catch (e) {
      handleError(e instanceof Error ? Number(e.message) : null);
    } finally {
      setIsFetching(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (isFetching) return;

    const target = cartItems.find((item) => item.product.id === productId);
    if (!target) {
      handleError(404);
      return;
    }

    try {
      setIsFetching(true);
      await deleteCartItems(target.id);
      fetchCartItems();
    } catch (e) {
      handleError(e instanceof Error ? Number(e.message) : null);
    } finally {
      setIsFetching(false);
    }
  };

  const increaseCartItemQuantity = async (productId: number) => {
    if (isFetching) return;

    const target = cartItems.find((item) => item.product.id === productId);
    if (!target) {
      handleError(404);
      return;
    }

    try {
      setIsFetching(true);
      await patchCartItems(target.id, target.quantity + 1);
      fetchCartItems();
    } catch (e) {
      handleError(e instanceof Error ? Number(e.message) : null);
    } finally {
      setIsFetching(false);
    }
  };

  const decreaseCartItemQuantity = async (productId: number) => {
    if (isFetching) return;

    const target = cartItems.find((item) => item.product.id === productId);
    if (!target) {
      handleError(404);
      return;
    }

    if (target.quantity === 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      setIsFetching(true);
      await patchCartItems(target.id, target.quantity - 1);
      fetchCartItems();
    } catch (e) {
      handleError(e instanceof Error ? Number(e.message) : null);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    cartItems,
    isLoading,
    error,
    fetchCartItems,
    addToCart,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  };
};

export default useCartItems;

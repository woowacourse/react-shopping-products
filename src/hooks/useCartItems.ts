import { Product } from '../App';
import getCartItems from '../api/getCartItems';
import postCartItems from '../api/postCartItems';
import deleteCartItems from '../api/deleteCartItems';
import patchCartItems from '../api/patchCartItems';
import { useDataContext } from '../components/contexts/dataContext';
import { useState } from 'react';

const useCartItems = () => {
  const {
    data: cartItems,
    refetch: fetchCartItems,
    isLoading,
    error,
    updateError,
  } = useDataContext({
    fetcher: getCartItems,
    key: 'cartItems',
  });

  const [isFetching, setIsFetching] = useState(false);

  const addToCart = async (product: Product) => {
    if (isFetching) {
      return;
    }

    try {
      setIsFetching(true);
      await postCartItems(product);
      setIsFetching(false);
      fetchCartItems();
    } catch (e) {
      updateError('cartItems', e instanceof Error ? Number(e.message) : null);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (isFetching) {
      return;
    }

    const targetCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );

    if (!targetCartItem) {
      updateError('cartItems', 404);
      return;
    }

    try {
      setIsFetching(true);
      await deleteCartItems(targetCartItem.id);
      setIsFetching(false);
      fetchCartItems();
    } catch (e) {
      updateError('cartItems', e instanceof Error ? Number(e.message) : null);
    }
  };

  const increaseCartItemQuantity = async (productId: number) => {
    if (isFetching) {
      return;
    }

    const targetCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );

    if (!targetCartItem) {
      updateError('cartItems', 404);
      return;
    }
    const currentQuantity = targetCartItem.quantity;

    try {
      setIsFetching(true);
      await patchCartItems(targetCartItem.id, currentQuantity! + 1);
      setIsFetching(false);
      fetchCartItems();
    } catch (e) {
      updateError('cartItems', e instanceof Error ? Number(e.message) : null);
    }
  };

  const decreaseCartItemQuantity = async (productId: number) => {
    if (isFetching) {
      return;
    }

    const targetCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );
    if (!targetCartItem) {
      updateError('cartItems', 404);
      return;
    }

    const currentQuantity = targetCartItem.quantity;

    if (currentQuantity === 1) {
      removeFromCart(productId);
      return;
    }

    try {
      setIsFetching(true);
      await patchCartItems(targetCartItem.id, currentQuantity! - 1);
      setIsFetching(false);
      fetchCartItems();
    } catch (e) {
      updateError('cartItems', e instanceof Error ? Number(e.message) : null);
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

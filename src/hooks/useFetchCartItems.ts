import { useCallback } from 'react';
import { getCartItems, postCartItems, deleteCartItem } from '../api/cartItems';
import { useData } from './useData';
import { ERROR_MSG } from '../constants/errorMessage';

export type CartProductIds = {
  productId: number;
  cartId: number;
};

export const useFetchCartItems = () => {
  const fetchCartItems = useCallback(async () => {
    const data = await getCartItems();
    const mapped: CartProductIds[] = data.map((item) => ({
      productId: item.product.id,
      cartId: item.id,
    }));
    return mapped;
  }, []);

  const { data, isLoading, error, refetch } = useData<CartProductIds[]>({
    key: 'cart-items',
    fetchFn: fetchCartItems,
  });

  const addToCart = async (productId: number) => {
    try {
      await postCartItems(productId);
      refetch();
    } catch (error) {
      console.error(ERROR_MSG.CART_ADD_FAIL, error);
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      await deleteCartItem(cartId);
      refetch();
    } catch (error) {
      console.error(ERROR_MSG.CART_REMOVE_FAIL, error);
    }
  };

  return {
    data: data || [],
    isLoading,
    error,
    addToCart,
    removeFromCart,
  };
};

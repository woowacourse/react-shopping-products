import { useCallback, useEffect, useState } from 'react';
import { addCart, getCartItem, patchCart, removeCart } from '../api/fetchCart';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { CartItem, ErrorType, ProductElement } from '../types/type';
import { MAX_CART_ITEM_COUNT } from '../constants/cartConfig';
import { getCartId } from '../utils/getCartId';
import { useToastContext } from '../context/ToastContext';

export const useCartList = () => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({
    isError: false,
    errorMessage: '',
  });
  const { showToast } = useToastContext();

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
      if (error instanceof Error) {
        showToast(error.message);
        // setError({
        //   isError: true,
        //   errorMessage: error.message,
        // });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCart = async (product: ProductElement) => {
    if (cartList?.length === MAX_CART_ITEM_COUNT) {
      console.error(ERROR_MESSAGE.MAX_CART_ITEM);
      // setIsError(true);
      return;
    }
    try {
      const cartItem = cartList.find((item) => item.product.id === product.id);
      if (cartItem) {
        await patchCart(cartItem.id, cartItem.quantity + 1);
      } else {
        await addCart(product.id);
      }
      await fetchData();
    } catch (error) {
      console.error(error);
      // setIsError(true);
    }
  };

  const handleRemoveCart = async (product: ProductElement) => {
    try {
      if (product) {
        const cartId = getCartId(cartList, product.id);
        await removeCart(cartId);
        await fetchData();
      }
    } catch (error) {
      console.error(error);
      // setIsError(true);
    }
  };

  return {
    cartList,
    isLoading,
    error,
    fetchData,
    handleAddCart,
    handleRemoveCart,
  };
};

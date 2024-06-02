import { deleteCartItem, postCartItem } from '@/api/cartItem';
import { useEffect, useState } from 'react';

import useCartListContext from '@/hooks/useCartListContext';

const useProductSelector = (productId: number) => {
  const { cartList, fetchCartList } = useCartListContext();

  const [isSelected, setIsSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const isInCart = cartList.some((item) => item.product.id === productId);
    setIsSelected(isInCart);
  }, [cartList, productId]);

  const addCartItem = async () => {
    try {
      setIsLoading(true);

      await postCartItem(productId);

      setIsSelected(true);
      fetchCartList();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCartItem = async () => {
    try {
      setIsLoading(true);

      const index = cartList.find((item) => item.product.id === productId);
      await deleteCartItem(index?.id as number);

      setIsSelected(false);
      fetchCartList();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSelected,
    isLoading,
    error,
    addCartItem,
    removeCartItem,
  };
};

export default useProductSelector;

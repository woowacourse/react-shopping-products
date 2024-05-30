import { deleteCartItem, postCartItem } from '@/api/cartItem';
import { useEffect, useState } from 'react';

import useCartItemFinder from '@/hooks/useCartItemFinder';
import useCartListContext from '@/hooks/useCartListContext';

const useProductSelector = (productId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const { isInCart } = useCartItemFinder(productId);
  const [isSelected, setIsSelected] = useState(false);

  const { cartList, fetchCartList } = useCartListContext();

  useEffect(() => {
    setIsSelected(isInCart);
  }, [isInCart]);

  const addCartItem = async () => {
    try {
      setLoading(true);

      await postCartItem(productId);

      setIsSelected(true);
      fetchCartList();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async () => {
    try {
      setLoading(true);

      const index = cartList.find((item) => item.product.id === productId);
      await deleteCartItem(index?.id as number);

      setIsSelected(false);
      fetchCartList();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isSelected,
    loading,
    error,
    addCartItem,
    removeCartItem,
  };
};

export default useProductSelector;

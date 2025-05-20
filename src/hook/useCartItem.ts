import { useCallback, useState, useEffect } from 'react';
import { getCartItem } from '../api/cartItem';
import { CartItem } from '../page/ShopPage';

export function useCartItem() {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [isError, setIsError] = useState(false);

  const updateCartItemList = useCallback(async () => {
    try {
      const response = await getCartItem({ sortBy: 'asc' });
      setCartItemList(response.content);
    } catch (e) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    updateCartItemList();
  }, [updateCartItemList]);

  return { cartItemList, isError, updateCartItemList };
}

import { useEffect, useState } from 'react';

import { useToast } from './useToast';
import { fetchItems } from '../api';

const useCartItems = () => {
  const [cartItemIds, setCartItem] = useState<number[] | null>(null);
  const { createToast } = useToast();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await fetchItems();

        const newCartItemIds = cartItems.map((cartItem) => cartItem.product.id);
        setCartItem(newCartItemIds);
      } catch (error) {
        if (error instanceof Error) {
          createToast(
            '⛔️ 장바구니 상품을 가져오는데 실패했습니다. 새로고침해주세요',
          );
        }
      }
    };
    fetchCartItems();
  }, [createToast]);

  const isInCart = (productId: number) => {
    return cartItemIds !== null && cartItemIds.includes(productId);
  };

  return { cartItemIds, isInCart };
};

export default useCartItems;

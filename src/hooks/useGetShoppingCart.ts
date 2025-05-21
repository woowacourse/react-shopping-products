import { useState, useEffect } from 'react';
import { getShoppingCart } from '../APIs/shoppingCart';
import { CartItem } from '../types/cart.type';
import { INITIAL_ERROR } from '../contexts/context.constant';
import { ErrorState } from '../types/error.type';

export function useGetShoppingCart() {
  const [data, setData] = useState<CartItem[]>([]);
  const [shoppingCartError, setShoppingCartError] =
    useState<ErrorState>(INITIAL_ERROR);
  const [isShoppingCartLoading, setIsShoppingCartLoading] =
    useState<boolean>(false);

  const handleGet = async () => {
    setIsShoppingCartLoading(true);
    try {
      const endpoint = '/cart-items';
      const newCartItems = await getShoppingCart(endpoint);
      setData(newCartItems);
    } catch {
      setShoppingCartError({
        is: true,
        message: '장바구니를 가져오는 데 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsShoppingCartLoading(false);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return { data, shoppingCartError, isShoppingCartLoading };
}

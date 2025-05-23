import { useState, useEffect } from 'react';
import { getShoppingCart } from '../APIs/shoppingCartApi';
import { CartItem } from '../types/cart.type';
import { INITIAL_ERROR } from '../contexts/context.constant';
import { ErrorState } from '../types/error.type';

export function useGetShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<ErrorState>(INITIAL_ERROR);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const endpoint = '/cart-items';
        const newCartItems = await getShoppingCart(endpoint);
        setCartItems(newCartItems);
      } catch {
        setError({
          is: true,
          message: '장바구니를 가져오는 데 실패했습니다. 다시 시도해주세요.',
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { cartItems, error, loading, setCartItems, setError, setLoading };
}

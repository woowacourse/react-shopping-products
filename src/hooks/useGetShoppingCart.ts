import { useState, useCallback, useEffect } from 'react';
import getShoppingCart from '../APIs/getShoppingCart';
import { CartItem } from '../types/product.type';
import { INITIAL_ERROR } from '../contexts/context.constant';
import { ErrorState } from '../types/product.type';

export function useGetShoppingCart() {
  const [data, setData] = useState<CartItem[]>([]);
  const [error, setError] = useState<ErrorState>(INITIAL_ERROR);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGet = useCallback(async () => {
    setIsLoading(true);
    try {
      const endpoint = '/cart-items';
      const newCartItems = await getShoppingCart({ endpoint });
      setData(newCartItems);
    } catch {
      setError({
        is: true,
        message: '장바구니를 가져오는 데 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGet();
  }, [handleGet]);

  return { data, error, isLoading };
}

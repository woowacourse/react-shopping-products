import { useEffect, useState } from 'react';

import useCartListContext from '@/hooks/useCartListContext';

const useCartItemFinder = (productId: number) => {
  const [isInCart, setIsInCart] = useState(false);
  const { cartList } = useCartListContext();

  useEffect(() => {
    const fetchData = async () => {
      const isSelected = cartList.some((item) => item.product.id === productId);
      setIsInCart(isSelected);
    };

    fetchData();
  }, [productId, cartList]);

  return { isInCart };
};

export default useCartItemFinder;

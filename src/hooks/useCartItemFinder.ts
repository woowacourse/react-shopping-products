// 1. 장바구니 담겨있는지 확인하는 메서드 (id)
//     1. 장바구니 리스트 get (cartId, quantity, product {id})
//     2. 리스트에서 id 찾기
//     3. 존재 유무 리턴

import { useEffect, useState } from 'react';

import useCartListContext from './useCartListContext';

const useCartItemFinder = (productId: number) => {
  const [isInCart, setIsInCart] = useState(false);
  const { cartList } = useCartListContext();

  useEffect(() => {
    const fetchData = async () => {
      const isSelected = cartList.some((item) => item.product.id === productId);
      setIsInCart(isSelected);
    };
    fetchData();
  }, [productId]);

  return { isInCart };
};

export default useCartItemFinder;

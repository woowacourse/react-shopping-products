import { useState } from 'react';

import { useToast } from './useToast';
import { addCartItem, deleteCartItem } from '@/api/cartItem';
import useCartListContext from './useCartListContext';

interface CartButtonProps {
  productId: number;
  initIsInCart: boolean;
}

const useCartItemHandler = ({ productId, initIsInCart }: CartButtonProps) => {
  const [isInCart, setIsInCart] = useState(initIsInCart);
  const { cartList, setCartListQuantity } = useCartListContext();
  const { createToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAddCartItem = async () => {
    try {
      setError(false);
      setLoading(true);
      setCartListQuantity((prev) => prev + 1);
      setIsInCart(true);
      await addCartItem(productId);
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
        setCartListQuantity((prev) => Math.max(0, prev - 1));
        setIsInCart(false);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCartItem = async () => {
    try {
      setError(false);
      setLoading(true);
      setCartListQuantity((prev) => Math.max(0, prev - 1));
      setIsInCart(false);
      // const cartList = await fetchCartList();
      const cartItemId = cartList.find(
        (cartItem) => cartItem.product.id === productId,
      )?.id;
      if (cartItemId) {
        await deleteCartItem(cartItemId);
      }
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.');
        setCartListQuantity((prev) => prev + 1);
        setIsInCart(true);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return { isInCart, handleAddCartItem, handleRemoveCartItem, loading, error };
};

export default useCartItemHandler;

import { useState } from 'react';
import { addCartItem, deleteCartItem } from '../api';
import { useCart } from '../context/CartContext';
import { useToast } from './useToast';
import { CHANGE_CART_ITEM_COUNT } from '../constants';

interface CartButtonProps {
  productId: number;
  initIsInCart: boolean;
}

const useCartItemHandler = ({ productId, initIsInCart }: CartButtonProps) => {
  const [isInCart, setIsInCart] = useState(initIsInCart);
  const { setCounts } = useCart();
  const { createToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAddCartItem = async (itemQuantity: number) => {
    try {
      setError(false);
      setLoading(true);
      setCounts((prev) => prev + CHANGE_CART_ITEM_COUNT);
      setIsInCart(true);
      await addCartItem(productId, itemQuantity);
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
        setCounts((prev) => Math.max(0, prev - 1));
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
      setCounts((prev) => Math.max(0, prev - CHANGE_CART_ITEM_COUNT));
      setIsInCart(false);
      await deleteCartItem(productId);
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.');
        setCounts((prev) => prev + 1);
        setIsInCart(true);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    isInCart,
    handleAddCartItem,
    handleRemoveCartItem,
    loading,
    error,
  };
};

export default useCartItemHandler;

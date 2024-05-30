import { useState } from 'react';
import { addCartItem, deleteCartItem } from '../api';
import { useCart } from '../context/ShoppingCartCountContext';
import { useToast } from './useToast';

interface CartButtonProps {
  itemId: number;
  initIsInCart: boolean;
}

const useCartItem = ({ itemId, initIsInCart }: CartButtonProps) => {
  const [isInCart, setIsInCart] = useState(initIsInCart);
  const { setCounts } = useCart();
  const { createToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAddCartItem = async () => {
    try {
      setLoading(true);
      setCounts((prev) => prev + 1);
      setIsInCart((prev) => !prev);
      await addCartItem(itemId);
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
        setCounts((prev) => Math.max(0, prev - 1));
        setIsInCart((prev) => !prev);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCartItem = async () => {
    try {
      setLoading(true);
      setCounts((prev) => Math.max(0, prev - 1));
      setIsInCart((prev) => !prev);
      await deleteCartItem(itemId);
    } catch (error) {
      if (error instanceof Error) {
        createToast('⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.');
        setCounts((prev) => prev + 1);
        setIsInCart((prev) => !prev);
      }
    } finally {
      setLoading(false);
    }
  };

  return { isInCart, handleAddCartItem, handleRemoveCartItem, loading };
};

export default useCartItem;

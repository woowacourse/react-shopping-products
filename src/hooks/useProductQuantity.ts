import { useState } from 'react';
import { AddCartItemType } from '../types/cartItem';

type UseProductQuantityProps = {
  id: number;
  quantity: number;
  isAdd: boolean;
  onClickUpdateCartItem: ({ productId, quantity }: { productId: number; quantity: number }) => void;
  onClickDeleteCartItem: ({ productId }: { productId: number }) => void;
  onClickAddCartItem: ({ productId, quantity }: AddCartItemType) => void;
};

function useProductQuantity({
  id,
  quantity,
  isAdd,
  onClickUpdateCartItem,
  onClickDeleteCartItem,
  onClickAddCartItem,
}: UseProductQuantityProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const isOutOfStock = quantity === 0;

  const handleIncreaseQuantity = () => {
    if (selectedQuantity < quantity) {
      const newQuantity = selectedQuantity + 1;
      setSelectedQuantity(newQuantity);
      if (isAdd) {
        onClickUpdateCartItem({ productId: id, quantity: newQuantity });
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity === 1) {
      if (isAdd) {
        onClickDeleteCartItem({ productId: id });
      }
      setSelectedQuantity(1);
      return;
    }

    if (selectedQuantity > 1) {
      const newQuantity = selectedQuantity - 1;
      setSelectedQuantity(newQuantity);
      if (isAdd) {
        onClickUpdateCartItem({ productId: id, quantity: newQuantity });
      }
    }
  };

  const handleAddToCart = () => {
    onClickAddCartItem({ productId: id, quantity: selectedQuantity });
  };

  return {
    selectedQuantity,
    isOutOfStock,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
  };
}

export default useProductQuantity;

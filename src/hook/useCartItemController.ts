import { useEffect, useState } from 'react';
import { postCartItem, putCartItem, deleteCartItem } from '../api/cartItem';
import { CartItem } from '../page/ShopPage';

interface useCartItemControllerProps {
  productId: number;
  stock: number;
  selectedCartItem?: CartItem;
  onChange: () => void;
}

export default function useCartItemController({
  productId,
  stock,
  selectedCartItem,
  onChange,
}: useCartItemControllerProps) {
  const [quantity, setQuantity] = useState(selectedCartItem?.quantity ?? 0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setQuantity(selectedCartItem?.quantity ?? 0);
  }, [selectedCartItem]);

  const handleAddToCart = async () => {
    await postCartItem({ productId, quantity: 1 });
    setQuantity(1);
    onChange();
  };

  const handleIncrease = async () => {
    const next = quantity + 1;
    if (next > stock) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    await putCartItem({ id: selectedCartItem!.id, quantity: next });
    setQuantity(next);
    onChange();
  };

  const handleDecrease = async () => {
    const next = quantity - 1;
    if (next === 0) {
      await deleteCartItem(selectedCartItem!.id);
    } else {
      await putCartItem({ id: selectedCartItem!.id, quantity: next });
    }
    setQuantity(next);
    onChange();
  };

  return {
    quantity,
    showToast,
    handleAddToCart,
    handleIncrease,
    handleDecrease,
  };
}

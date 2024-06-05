import { MinusIcon, PlusIcon } from '@/assets/index';
import QuantityContainer from './QuantityPicker.style';
import { useState } from 'react';

interface QuantityPickerProps {
  handlePatchCartItem: ({ quantity }: { quantity: number }) => void;
  handleRemoveCartItem: () => void;
}

export default function QuantityPicker({
  handlePatchCartItem,
  handleRemoveCartItem,
}: QuantityPickerProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncreaseQuantity = async () => {
    setQuantity(quantity + 1);
    handlePatchCartItem({ quantity: quantity + 1 });
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      handleRemoveCartItem();
      return;
    }

    const newQuantity = Math.max(quantity - 1, 0);
    setQuantity(newQuantity);
    handlePatchCartItem({ quantity: newQuantity });
  };

  return (
    <QuantityContainer>
      <button onClick={handleDecreaseQuantity}>
        <img src={MinusIcon} alt="Decrease quantity" />
      </button>
      <p className="quantity">{quantity}</p>
      <button onClick={handleIncreaseQuantity}>
        <img src={PlusIcon} alt="Increase quantity" />
      </button>
    </QuantityContainer>
  );
}

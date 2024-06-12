import { MinusIcon, PlusIcon } from '@/assets/index';
import QuantityContainer from './QuantityPicker.style';
import { useState, useEffect } from 'react';
import { useCartItemStatus, usePatchCartItem } from '@/hooks/index';
import { Button } from '@/components/index';
import { useTheme } from '@emotion/react';

interface QuantityPickerProps {
  cartItemId: number;
  productId: number;
  isAutoDelete?: boolean;
}

const QuantityPicker = ({
  cartItemId,
  productId,
  isAutoDelete = false,
}: QuantityPickerProps) => {
  const { quantity: initialQuantity } = useCartItemStatus(productId);
  const [quantity, setQuantity] = useState(initialQuantity);
  const { cartItemQuantityMutation } = usePatchCartItem();
  const { colors } = useTheme();

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDecreaseQuantity = () => {
    if (!isAutoDelete) {
      if (quantity === 1) {
        setQuantity(0);
      } else if (quantity > 1) {
        const newQuantity = Math.max(0, quantity - 1);
        setQuantity(newQuantity);
        cartItemQuantityMutation.mutate({
          cartItemId,
          quantity: newQuantity,
        });
      }
    } else {
      cartItemQuantityMutation.mutate({
        cartItemId,
        quantity: Math.max(0, quantity - 1),
      });
    }
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = Math.min(100, quantity + 1);
    setQuantity(newQuantity);
    cartItemQuantityMutation.mutate({
      cartItemId,
      quantity: newQuantity,
    });
  };

  return (
    <QuantityContainer>
      <Button
        color={colors.black}
        backgroundColor={colors.white}
        onClick={handleDecreaseQuantity}
        hasBorderRadius
        borderColor={colors.border}
        width="24px"
        height="24px"
      >
        <img src={MinusIcon} alt="Decrease quantity" />
      </Button>
      <p className="quantity">{quantity}</p>
      <Button
        color={colors.black}
        backgroundColor={colors.white}
        onClick={handleIncreaseQuantity}
        hasBorderRadius
        borderColor={colors.border}
        width="24px"
        height="24px"
      >
        <img src={PlusIcon} alt="Increase quantity" />
      </Button>
    </QuantityContainer>
  );
};

export default QuantityPicker;

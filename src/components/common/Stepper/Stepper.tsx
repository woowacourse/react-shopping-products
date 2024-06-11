import * as Styled from './Stepper.styled';

interface QuantityControllerProps {
  quantity: number;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export default function Stepper({
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  minQuantity = 1,
  maxQuantity = Infinity,
}: QuantityControllerProps) {
  return (
    <Styled.QuantityControllerContainer>
      <Styled.QuantityControlButton
        $controlType='decrease'
        $isEnabled={minQuantity < quantity}
        onClick={handleDecreaseQuantity}
      />
      {quantity}
      <Styled.QuantityControlButton
        $controlType='increase'
        $isEnabled={quantity < maxQuantity}
        onClick={handleIncreaseQuantity}
      />
    </Styled.QuantityControllerContainer>
  );
}

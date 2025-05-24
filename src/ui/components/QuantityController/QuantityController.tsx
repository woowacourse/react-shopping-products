import { Container, Icon, QuantityText } from './QuantityController.styles';

interface QuantityControllerProps {
  quantity: number;
  position: 'start' | 'end';
  onAddClick?: () => void;
  onIncreaseClick?: () => void;
  onDecreaseClick?: () => void;
  onRemoveClick?: () => void;
  // onDecrease?: () => void;
}

function QuantityController({
  quantity,
  position,
  onIncreaseClick,
  onDecreaseClick,
  onRemoveClick,
}: QuantityControllerProps) {
  return (
    <Container position={position}>
      <Icon
        src="./minusButton.png"
        alt="마이너스 버튼"
        onClick={quantity === 0 ? onRemoveClick : onDecreaseClick}
      />
      <QuantityText>{quantity}</QuantityText>
      <Icon
        src="./plusButton.png"
        alt="플러스 버튼"
        onClick={onIncreaseClick}
      />
    </Container>
  );
}

export default QuantityController;

import { Container, Icon, QuantityText } from './QuantityController.styles';

interface QuantityControllerProps {
  quantity: number;
  onAddClick?: () => void;
  onRemoveClick?: () => void;
  // onDecrease?: () => void;
}

function QuantityController({
  quantity,
  onAddClick,
  onRemoveClick,
}: // onIncrease,
// onDecrease,
QuantityControllerProps) {
  return (
    <Container>
      <Icon
        src="./minusButton.png"
        alt="마이너스 버튼"
        onClick={onRemoveClick}
      />
      <QuantityText>{quantity}</QuantityText>
      <Icon src="./plusButton.png" alt="플러스 버튼" onClick={onAddClick} />
    </Container>
  );
}

export default QuantityController;

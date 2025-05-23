import { Container, Icon, QuantityText } from './QuantityController.styles';

interface QuantityControllerProps {
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

function QuantityController({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityControllerProps) {
  return (
    <Container>
      <Icon src="./minusButton.png" alt="마이너스 버튼" onClick={onDecrease} />
      <QuantityText>{quantity}</QuantityText>
      <Icon src="./plusButton.png" alt="플러스 버튼" onClick={onIncrease} />
    </Container>
  );
}

export default QuantityController;

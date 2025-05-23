import { Container, Icon, QuantityText } from './QuantityController.styles';

interface QuantityControllerProps {
  quantity: number;
}

function QuantityController({ quantity }: QuantityControllerProps) {
  return (
    <Container>
      <Icon src="./minusButton.png" alt="마이너스 버튼" />
      <QuantityText>{quantity}</QuantityText>
      <Icon src="./plusButton.png" alt="플러스 버튼" />
    </Container>
  );
}

export default QuantityController;

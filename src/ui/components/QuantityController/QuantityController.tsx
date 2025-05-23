import { Container, Icon, QuantityText } from './QuantityController.styles';

interface QuantityControllerProps {
  quantity: number;
  onClick?: () => void;
}

function QuantityController({ quantity, onClick }: QuantityControllerProps) {
  return (
    <Container>
      <Icon src="./minusButton.png" alt="마이너스 버튼" />
      <QuantityText>{quantity}</QuantityText>
      <Icon src="./plusButton.png" alt="플러스 버튼" onClick={onClick} />
    </Container>
  );
}

export default QuantityController;

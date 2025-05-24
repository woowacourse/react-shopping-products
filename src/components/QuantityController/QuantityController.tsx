import styled from "@emotion/styled";
import MinusIcon from "./components/MinusIcon/MinusIcon";
import PlusIcon from "./components/PlusIcon/PlusIcon";

interface QuantityControllerProps {
  cartQuantity: number;
  stockQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityController = ({
  cartQuantity,
  stockQuantity,
  onIncrease,
  onDecrease,
}: QuantityControllerProps) => {
  const isMaxQuantity = cartQuantity >= stockQuantity;

  return (
    <QuantityControllerContainer>
      <MinusIcon onClick={onDecrease} />
      <QuantityText>{cartQuantity}</QuantityText>
      <PlusIcon onClick={onIncrease} disabled={isMaxQuantity} />
    </QuantityControllerContainer>
  );
};

export default QuantityController;

const QuantityControllerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const QuantityText = styled.span`
  margin-top: 2px;
  font-size: 14px;
  font-weight: 500;
`;

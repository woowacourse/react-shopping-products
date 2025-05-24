import * as Styled from "./ProductQuantityControl.styled";
import plusIcon from "/plus.svg";
import minusIcon from "/minus.svg";

function ProductQuantityControl({
  quantity,
  handleIncreaseCartItemQuantity,
  handleMinusQuantity,
}: {
  quantity: number;
  handleIncreaseCartItemQuantity: () => void;
  handleMinusQuantity: () => void;
}) {
  return (
    <Styled.Container>
      <Styled.Button onClick={handleMinusQuantity}>
        <Styled.OperatorIcon src={minusIcon} />
      </Styled.Button>
      <Styled.Quantity>{quantity}</Styled.Quantity>
      <Styled.Button onClick={handleIncreaseCartItemQuantity}>
        <Styled.OperatorIcon src={plusIcon} />
      </Styled.Button>
    </Styled.Container>
  );
}

export default ProductQuantityControl;

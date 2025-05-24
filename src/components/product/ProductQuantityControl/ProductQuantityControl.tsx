import * as Styled from "./ProductQuantityControl.styled";
import plusIcon from "/plus.svg";
import minusIcon from "/minus.svg";

function ProductQuantityControl({
  quantity,
  handlePlusQuantity,
  handleMinusQuantity,
}: {
  quantity: number;
  handlePlusQuantity: () => void;
  handleMinusQuantity: () => void;
}) {
  return (
    <Styled.Container>
      <Styled.Button onClick={handleMinusQuantity}>
        <Styled.OperatorIcon src={minusIcon} />
      </Styled.Button>
      <Styled.Quantity>{quantity}</Styled.Quantity>
      <Styled.Button onClick={handlePlusQuantity}>
        <Styled.OperatorIcon src={plusIcon} />
      </Styled.Button>
    </Styled.Container>
  );
}

export default ProductQuantityControl;

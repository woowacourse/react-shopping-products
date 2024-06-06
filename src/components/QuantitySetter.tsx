import { ReactComponent as MinusIcon } from "../assets/minus.svg";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import usePatchCartItemQuantity from "../hooks/usePatchCartItemQuantity";
import styled from "styled-components";

interface QuantitySetterProps {
  cartItemId: number;
  quantity: number;
}

const QuantitySetter = ({ cartItemId, quantity }: QuantitySetterProps) => {
  const patchMutation = usePatchCartItemQuantity();

  const clickPlusButtonHandler = () => {
    patchMutation.mutate({ cartItemId, quantity: quantity + 1 });
  };

  const clickMinusButtonHandler = () => {
    patchMutation.mutate({ cartItemId, quantity: quantity - 1 });
  };

  return (
    <S.Container>
      <S.Button
        role="button"
        aria-label="수량 감소 버튼"
        onClick={clickMinusButtonHandler}
      >
        <MinusIcon />
      </S.Button>
      <S.Quantity>{quantity}</S.Quantity>
      <S.Button
        role="button"
        aria-label="수량 증가 버튼"
        onClick={clickPlusButtonHandler}
      >
        <PlusIcon />
      </S.Button>
    </S.Container>
  );
};

export default QuantitySetter;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 1.3rem;
  `,
  Button: styled.button`
    width: 2.5rem;
    height: 2.4rem;
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
  `,
  Quantity: styled.span``,
};

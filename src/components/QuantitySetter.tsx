import { ReactComponent as MinusIcon } from "../assets/minus.svg";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import styled from "styled-components";

const QuantitySetter = () => {
  return (
    <S.Container>
      <S.Button onClick={() => {}}>
        <MinusIcon />
      </S.Button>
      <S.Quantity>3</S.Quantity>
      <S.Button onClick={() => {}}>
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

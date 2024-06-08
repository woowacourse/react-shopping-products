import styled from "styled-components";

export const Wrapper = styled.dialog`
  &::backdrop {
    background-color: rgba(128, 128, 128, 0.5);
  }
`;

export const CartContent = styled.div`
  position: fixed;
  bottom: 0;
  transform: translateX(-50%);
  left: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 459px;
  border-radius: 8px 8px 0px 0px;
  border: 0;
  padding: 24px 16px 24px 16px;
`;

export const CartTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const CartProductList = styled.div`
  max-height: 400px;
  overflow: scroll;
`;

export const CartPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartPriceDescription = styled.div`
  font-size: 16px;
`;

export const CartPriceNumber = styled.div`
  font-size: 24px;
`;

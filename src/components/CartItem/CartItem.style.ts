import { styled, css } from "styled-components";

export const BorderLine = styled.div`
  width: 100%;

  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
`;

export const CartItemBox = styled.article`
  width: 100%;
  height: 80px;
  border-radius: 8px;

  display: flex;
  align-items: center;

  gap: 16px;

  margin-bottom: 24px;
`;

export const CartItemImage = styled.div<{ $imageUrl: string }>`
  width: 80px;
  height: 80px;

  border-radius: 8px;
  background: url(${({ $imageUrl }) => $imageUrl}) center/cover no-repeat;
`;

export const CartItemContentBox = styled.div`
  flex: 1;
  height: 77px;

  display: flex;
  justify-content: space-between;

  color: #0a0d13;
`;

export const CartItemInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;

  & > h2 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
  }
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ProductCartButton = styled.button<{ $isInCart: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 59px;
  height: 24px;
  padding: 8px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;

  ${({ $isInCart }) => css`
    background-color: ${$isInCart ? "#EAEAEA" : "#000000"};
    color: ${$isInCart ? "#000000" : "#FFFFFF"};
  `}
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #0a0d13;
`;

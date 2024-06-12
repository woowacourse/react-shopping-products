import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CartButton = styled.button`
  position: relative;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export const CartIcon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CartItemsNumber = styled.div`
  position: absolute;
  inset: 16px 0 0 12px;
  width: 19px;
  height: 19px;
  background: #ffffff;
  color: #000000;
  font-size: 10px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

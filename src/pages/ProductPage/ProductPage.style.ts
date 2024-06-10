import { styled, keyframes } from "styled-components";
import { CartItemIcon } from "../../assets";

export const ShopHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CartButton = styled.button`
  width: 32px;
  height: 32px;
  background: url("${CartItemIcon}") no-repeat center 2px;
  background-size: auto;
  cursor: pointer;
`;

export const CartItemsNumber = styled.div`
  position: absolute;
  top: 27px;
  right: 25px;
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

export const ShopContent = styled.div`
  padding: 100px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ShopTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
`;

export const SelectBoxContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

export const ObserverTarget = styled.div<{ $isEnabled: boolean }>`
  height: 10px;
  display: ${(props) => (props.$isEnabled ? "block" : "none")};
  position: absolute;
  bottom: 300px;
  opacity: 0;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const EmptyProductsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
  height: 60vh;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 36px;
  height: 36px;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 28px;
    height: 28px;
    margin: 4px;
    border-radius: 50%;
    border: 3px solid #666666;
    border-color: #666666 transparent #666666 transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;

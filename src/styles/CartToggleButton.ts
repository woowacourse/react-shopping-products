import styled from "@emotion/styled";
import { CartToggleButtonProps } from "../components/CartToggleButton";

export const CartToggleButtonWrapper = styled.div<CartToggleButtonProps>`
  display: flex;
  background-color: ${({ isInBascket }) =>
    isInBascket ? "#000000" : "#EAEAEA"};
  border-radius: 4px;
  padding: 4px 8px;
  gap: 4px;
`;

export const CartToggleButtonText = styled.div<CartToggleButtonProps>`
  color: ${({ isInBascket }) => (isInBascket ? "#ffffff" : "#000000")};
  background-color: 
  font-size: 12px;
  font-weight: 600;
`;

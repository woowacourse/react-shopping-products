import styled from "@emotion/styled";
import { CartToggleButtonWrapperProps } from "./CartToggleButton";

export const CartToggleButtonWrapper = styled.div<CartToggleButtonWrapperProps>`
  display: flex;
  background-color: ${({ isInBascket }) =>
    isInBascket ? "#EAEAEA" : "#000000"};
  border-radius: 4px;
  padding: 4px 8px;
  gap: 4px;
  cursor: pointer;
`;

export const CartToggleButtonText = styled.div<CartToggleButtonWrapperProps>`
  color: ${({ isInBascket }) => (isInBascket ? "#000000" : "#ffffff")};
  font-size: 12px;
  font-weight: 600;
`;

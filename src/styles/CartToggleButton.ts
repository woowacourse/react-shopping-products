import styled from '@emotion/styled';
import { CartToggleButtonWrapperProps } from '../components/CartToggleButton';

export const CartToggleButtonWrapper = styled.div<CartToggleButtonWrapperProps>`
  display: flex;
  background-color: ${({ isInCart }) => (isInCart ? '#EAEAEA' : '#000000')};
  border-radius: 4px;
  padding: 4px 8px;
  gap: 4px;
  cursor: pointer;
`;

export const CartToggleButtonText = styled.div<CartToggleButtonWrapperProps>`
  color: ${({ isInCart }) => (isInCart ? '#000000' : '#ffffff')};
  font-size: 12px;
  font-weight: 600;
`;

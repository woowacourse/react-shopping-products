import styled from '@emotion/styled';
import { ButtonProps } from './Button.type';

export const ButtonWrapper = styled.button<ButtonProps>`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  color: ${({ color, isGray }) => (isGray ? '#000' : color)};
  background-color: ${({ backgroundColor, isGray }) =>
    isGray ? '#EAEAEA' : backgroundColor};
`;

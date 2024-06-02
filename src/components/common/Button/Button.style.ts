import styled from '@emotion/styled';

interface ButtonStyleProps {
  color: string;
  backgroundColor: string;
  hasBorderRadius?: boolean;
  isGray?: boolean;
}
export const ButtonWrapper = styled.button<ButtonStyleProps>`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  color: ${({ color, isGray }) => (isGray ? '#000' : color)};
  background-color: ${({ backgroundColor, isGray }) =>
    isGray ? '#EAEAEA' : backgroundColor};
`;

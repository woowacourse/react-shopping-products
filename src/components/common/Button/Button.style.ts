import styled from '@emotion/styled';

interface ButtonStyleProps {
  color: string;
  backgroundColor: string;
  hasBorderRadius?: boolean;
}
export const ButtonWrapper = styled.button<ButtonStyleProps>`
  display: flex;
  border-radius: 4px;
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

import styled from '@emotion/styled';

interface ButtonStyleProps {
  color: string;
  backgroundColor: string;
  hasBorderRadius?: boolean;
  borderColor?: string;
  width?: string;
  height?: string;
}
export const ButtonWrapper = styled.button<ButtonStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border : ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor};` : 'none;'}
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
`;

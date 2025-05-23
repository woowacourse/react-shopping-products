import { css } from '@emotion/css';
import { ButtonStyleProps } from './Button';

export const button = ({ backgroundColor, radius, color }: ButtonStyleProps) => css`
  background-color: ${backgroundColor};
  border-radius: ${radius};
  color: ${color};
  border: none;
  cursor: pointer;
  padding: 4px 8px;
`;

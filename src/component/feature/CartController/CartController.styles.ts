import { css } from '@emotion/react';
import { theme } from '../../../style';

export const cartControllerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const controlButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid ${theme.color.gray2};
  border-radius: 8px;
  background-color: ${theme.color.white};
  cursor: pointer;
`;

import { css } from '@emotion/react';
import { theme } from '../../../style';

export const HeaderStyle = css`
  display: flex;
  width: 42.9rem;
  height: 6.4rem;
  padding: 0px 2.4rem;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 5;
  background: ${theme.color.black};
`;

export const CartStyle = css`
  position: relative;

  cursor: pointer;
`;

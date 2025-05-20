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

export const CartQuantityStyle = css`
  position: absolute;
  top: 70%;
  right: 0;
  transform: translateY(-50%);
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartStyle = css`
  position: relative;
`;

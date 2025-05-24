import { css } from '@emotion/react';
import { theme } from '../../../style';

export const productImageContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const soldOutOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  font-size: 2rem;
  font-weight: bold;
  color: ${theme.color.white};
`;

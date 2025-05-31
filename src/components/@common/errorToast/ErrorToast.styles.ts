import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { fadeIn, fadeOut } from '../../../animations/animations';

export const ErrorToastContainer = styled.div<{ $isVisible: boolean }>`
  max-width: var(--max-width-container);
  width: 100%;
  background-color: var(--color-red);
  padding: 12px 0;
  box-sizing: border-box;
  text-align: center;
  color: var(--color-white);
  position: fixed;
  left: 0;
  top: var(--height-header);
  z-index: var(--z-index-toast);

  ${({ $isVisible }) =>
    css`
      animation: ${$isVisible ? fadeIn : fadeOut} 0.3s ease-in-out;
    `}
`;

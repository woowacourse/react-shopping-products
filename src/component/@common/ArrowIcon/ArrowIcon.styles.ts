import { css } from '@emotion/react';

export const arrowIconStyle = (isOpen: boolean) => css`
  transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;

  width: 1.5rem;
  height: 1.5rem;
`;

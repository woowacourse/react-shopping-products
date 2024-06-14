import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type SizeType = 'small' | 'large' | 'full';

interface BorderButtonProps {
  size?: SizeType;
}

const getSizeStyle = (size?: SizeType) => {
  switch (size) {
    case 'small':
      return css`
        width: 24px;
        height: 24px;
        img {
          width: 12px;
        }
      `;
    case 'large':
      return css`
        width: 40px;
        height: 24px;
        img {
          width: 16px;
        }
      `;
    case 'full':
      return css`
        width: 100%;
        padding: 12px;
      `;
    default:
      return css`
        width: fit-content;
        padding: 8px;
      `;
  }
};

export const BorderButton = styled.button<BorderButtonProps>(
  ({ theme, size }) => css`
    font-size: 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid ${theme.colors.border};
    border-radius: 8px;

    ${getSizeStyle(size)}
  `
);

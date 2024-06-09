import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Price = styled.span<{ size: 'small' | 'large' }>`
  display: inline-block;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          font-size: 12px;
          font-weight: 500;
          line-height: 15px;
          text-align: left;
        `;
      case 'large':
        return css`
          font-size: 24px;
          font-weight: 700;
          line-height: 34.75px;
          text-align: right;
        `;
      default:
        return css``;
    }
  }}
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;


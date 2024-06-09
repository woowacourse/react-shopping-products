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

export const Description = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;

  margin-bottom: 12px;

  background-color: ${({ theme }) => theme.colors.divider};
`;

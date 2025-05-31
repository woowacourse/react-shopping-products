import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { SizeProps, ColorProps } from '../../../types/styleVariants';

const size = {
  small: css`
    max-width: 65px;
    height: 29px;
    padding: 4px 8px;
  `,
  large: css`
    width: 100%;
    padding: 12px 0;
  `,
};

const color = {
  black: css`
    background-color: var(--color-black);
    color: var(--color-white);
  `,
  grey: css`
    background-color: var(--color-grey);
    color: var(--color-black);
  `,
};

export const ButtonContainer = styled.button<{ $size: SizeProps; $color: ColorProps }>`
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;

  &:disabled {
    background-color: var(--color-grey);
    color: var(--color-white);
    cursor: not-allowed;
  }

  ${({ $size }) => size[$size]}
  ${({ $color }) => color[$color]}
`;

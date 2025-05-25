import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { VariantsProps } from '../../types/styleVariants';

export const buttonStyles = {
  smallBlack: css`
    max-width: 65px;
    height: 29px;
    padding: 4px 8px;
    background-color: var(--color-black);
    color: var(--color-white);
  `,

  smallGrey: css`
    max-width: 65px;
    height: 29px;
    padding: 4px 8px;
    background-color: var(--color-grey);
    color: var(--color-black);
  `,
};

export const ButtonContainer = styled.button<{ $variant: VariantsProps }>`
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;

  ${({ $variant }) => buttonStyles[$variant]}
`;

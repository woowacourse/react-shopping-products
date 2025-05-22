import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { IconButtonProps } from '.';

const buttonStyles = {
  primary: css`
    background-color: #000000;
    color: #ffffff;
    font-weight: 500;
    &:hover {
      background-color: #808080;
    }
  `,
  secondary: css`
    background-color: #eaeaea;
    color: #000000;
    font-weight: 500;

    &:hover {
      background-color: #d0d0d0;
    }
  `,
};

export const StyledButton = styled.button<IconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  gap: 2px;
  cursor: pointer;

  ${({ variant }) => buttonStyles[variant ?? 'primary']}
  &:disabled {
    background-color: #eaeaea;
    color: #808080;
    cursor: not-allowed;
  }
`;

export const StyledImgIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
`;

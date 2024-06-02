import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

type ButtonThemeType = 'dark' | 'light' | 'disabled';

const BUTTON_THEME = {
  dark: {
    backgroundColor: theme.color.black,
    color: theme.color.white,
  },
  light: {
    backgroundColor: theme.color.lightGray,
    color: theme.color.black,
  },
  disabled: {
    backgroundColor: theme.color.gray,
    color: theme.color.white,
  },
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  $theme?: ButtonThemeType;
  $width?: string;
  $height?: string;
  $borderRadius?: string;
}

const BaseButton = ({ children, ...rest }: Props) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default BaseButton;

const StyledButton = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $theme }) =>
    $theme ? BUTTON_THEME[$theme].backgroundColor : 'transparent'};
  color: ${({ $theme }) => ($theme ? BUTTON_THEME[$theme].color : 'inherit')};
  width: ${({ $width }) => ($width ? $width : 'fit-content')};
  height: ${({ $height }) => ($height ? $height : 'fit-content')};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : '4px'};
`;

import styled from '@emotion/styled';
import { BUTTON_THEME } from '@/styles/constants/theme';

type ButtonThemeType = 'black' | 'white' | 'gray' | 'disabled';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  $theme?: ButtonThemeType;
  $width?: string;
  $height?: string;
  $borderRadius?: string;
}

const BaseButton = ({ children, ...rest }: Props) => {
  return <Button {...rest}>{children}</Button>;
};

export default BaseButton;

const Button = styled.button<Props>`
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

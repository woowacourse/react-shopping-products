import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { ButtonWrapper } from './Button.style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  backgroundColor?: string;
  hasBorderRadius?: boolean;
  borderColor?: string;
  width?: string;
  height?: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
  color = '#fff',
  backgroundColor = '#fff',
  hasBorderRadius = false,
  borderColor,
  width,
  height,
}) => {
  return (
    <ButtonWrapper
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      hasBorderRadius={hasBorderRadius}
      onClick={onClick}
      width={width}
      height={height}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;

import { HTMLAttributes } from "react";
import * as S from "./Button.styles";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  children: React.ReactNode;
}

const Button = ({ backgroundColor = "#000", children, ...props }: ButtonProps) => {
  return (
    <S.Button backgroundColor={backgroundColor} {...props}>
      {children}
    </S.Button>
  );
};

export default Button;

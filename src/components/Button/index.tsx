import { ComponentProps, ReactNode } from "react";
import * as S from "./Button.styled";
import { ButtonVariants } from "./type";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant: ButtonVariants;
}

function Button({ children, ...props }: ButtonProps) {
  return <S.Button {...props}>{children}</S.Button>;
}

export default Button;

import { HTMLAttributes } from "react";
import * as S from "./Button.styles";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({ backgroundColor = "#000", children, isLoading = false, ...props }: ButtonProps) {
  return (
    <S.Button backgroundColor={backgroundColor} isLoading={isLoading} {...props}>
      {children}
    </S.Button>
  );
}

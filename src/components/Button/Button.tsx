import { HTMLAttributes } from "react";
import * as S from "./Button.styles";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  backgroundColor = "#000",
  children,
  isLoading = false,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <S.Button
      backgroundColor={backgroundColor}
      isLoading={isLoading}
      onClick={(event) => !isLoading && onClick?.(event)}
      {...props}
    >
      {children}
    </S.Button>
  );
}

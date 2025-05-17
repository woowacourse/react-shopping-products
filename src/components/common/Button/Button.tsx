import * as S from "./Button.styled";
import React from "react";

type ButtonVariation = "light" | "dark";
interface ButtonProps {
  text: string;
  icon: React.ReactNode;
  variation: ButtonVariation;
  onClick?: () => void;
}

function Button({ text, icon, variation, onClick }: ButtonProps) {
  return (
    <S.CartButton variation={variation} onClick={onClick}>
      {icon}
      {text}
    </S.CartButton>
  );
}

export default Button;

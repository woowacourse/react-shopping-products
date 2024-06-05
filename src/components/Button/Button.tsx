import { HTMLAttributes, ReactNode } from "react";
import { Wrapper } from "./Button.style";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme?: "black" | "white";
}

const Button = ({ children, theme = "white", ...rest }: ButtonProps) => {
  return (
    <Wrapper theme={theme} {...rest}>
      {children}
    </Wrapper>
  );
};

export default Button;

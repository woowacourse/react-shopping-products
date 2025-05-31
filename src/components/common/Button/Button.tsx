import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "full";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant: ButtonVariant;
  size: ButtonSize;
}

const Button = ({ type = "button", text, variant, size, ...props }: ButtonProps) => {
  return (
    <button type={type} css={buttonStyle(variant, size)} {...props}>
      {text}
    </button>
  );
};

export default Button;

const buttonStyle = (variant: ButtonVariant, size: ButtonSize) => css`
  ${selectVariant(variant)}
  ${selectSize(size)}
`;

const selectVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: #333;
        color: #fff;
        border-radius: 5px;
      `;
    case "secondary":
      return css`
        background-color: #fff;
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      `;
  }
};

const selectSize = (size: ButtonSize) => {
  switch (size) {
    case "full":
      return css`
        width: 100%;
        padding: 13px 0;
        font-size: 15px;
      `;
    case "sm":
      return css`
        padding: 4px 8px;
        font-size: 12px;
      `;
  }
};

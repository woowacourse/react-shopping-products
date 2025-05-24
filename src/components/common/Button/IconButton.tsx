import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

type IconButtonVariant = "dark" | "light";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: IconButtonVariant;
}

const IconButton = ({ children, icon, iconPosition = "left", variant = "dark", ...props }: IconButtonProps) => {
  return (
    <button css={buttonStyle(variant)} {...props}>
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </button>
  );
};

export default IconButton;

const buttonStyle = (variant: IconButtonVariant) => css`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  ${selectVariant(variant)}
`;

const selectVariant = (variant: IconButtonVariant) => {
  switch (variant) {
    case "dark":
      return css`
        background-color: #000;
        color: #fff;
      `;
    case "light":
      return css`
        background-color: #fff;
        color: #000;
      `;
  }
};

import { ButtonHTMLAttributes } from "react";
import { buttonLayout } from "./Button.style";

type ButtonStyleProps = "primary" | "secondary" | "ghost";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  onClick: () => void;
  children: React.ReactNode;
  style?: ButtonStyleProps;
  size?: "sm" | "full";
  dataTestid?: string;
}

export default function Button({
  onClick,
  children,
  style = "primary",
  size = "sm",
  dataTestid,
  disabled = false,
}: ButtonProps) {
  const colorVariant = {
    primary: { backgroundColor: "#000000", color: "#FFFFFF", border: "none" },
    secondary: {
      backgroundColor: "#EAEAEA",
      color: "#000000",
      border: "none",
    },
    ghost: {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      border: "1px solid #0000001A",
    },
  };

  return (
    <button
      css={buttonLayout(
        size,
        disabled,
        colorVariant[style].backgroundColor,
        colorVariant[style].color,
        colorVariant[style].border
      )}
      onClick={onClick}
      data-testid={dataTestid}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

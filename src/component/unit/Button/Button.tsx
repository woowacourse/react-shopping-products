import { buttonLayout } from "./Button.style";

type ButtonStyleProps = "primary" | "secondary" | "ghost";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: ButtonStyleProps;
  size?: "sm" | "full";
}

export default function Button({
  onClick,
  children,
  style = "primary",
  size = "sm",
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
        colorVariant[style].backgroundColor,
        colorVariant[style].color,
        colorVariant[style].border,
        size
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

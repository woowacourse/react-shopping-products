import { buttonLayout } from "./Button.style";

type ButtonStyleProps = "primary" | "secondary";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: ButtonStyleProps;
}

export default function Button({
  onClick,
  children,
  style = "primary",
}: ButtonProps) {
  const colorVariant = {
    primary: { backgroundColor: "#000000", color: "#FFFFFF" },
    secondary: {
      backgroundColor: "#EAEAEA",
      color: "#000000",
    },
  };

  return (
    <button
      css={buttonLayout(
        colorVariant[style].backgroundColor,
        colorVariant[style].color
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

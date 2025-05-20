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
  let backgroundColor = "#000000";
  let color = "#FFFFFF";
  if (style === "secondary") {
    backgroundColor = "#EAEAEA";
    color = "#000000";
  }

  return (
    <button css={buttonLayout(backgroundColor, color)} onClick={onClick}>
      {children}
    </button>
  );
}

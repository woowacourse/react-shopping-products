import { css } from "@emotion/react";

type ButtonStyleProps = "primary" | "secondary";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: ButtonStyleProps;
}

const buttonLayout = (backgroundColor: string, color: string) => {
  return css`
    display: flex;
    align-items: center;
    padding: 4px 8px;
    background-color: ${backgroundColor};
    border-radius: 4px;
    color: ${color};
    gap: 4px;
    font-weight: 600;
    font-family: "Noto Sans";
    font-size: 12px;
  `;
};

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

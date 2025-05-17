import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ backgroundColor = "#000", children, ...props }: ButtonProps) => {
  return (
    <button css={buttonStyle(backgroundColor)} {...props}>
      {children}
    </button>
  );
};

export default Button;

const buttonStyle = (backgroundColor: string) => css`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 8px;
  background-color: ${backgroundColor};
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

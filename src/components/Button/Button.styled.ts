import styled from "@emotion/styled";
import { ButtonVariants } from "./type";

const buttonTheme: Record<ButtonVariants, Record<string, string>> = {
  primary: { text: "#ffffff", background: "#000000" },
  secondary: { text: "#000000", background: "#eaeaea" },
  outline: { text: "#000000", background: "#ffffff" },
};

export const Button = styled.button<{ variant: ButtonVariants }>`
  background-color: ${({ variant }) => buttonTheme[variant].background};
  color: ${({ variant }) => buttonTheme[variant].text};
  padding: ${({ variant }) => (variant === "outline" ? "4px 8px" : "8px 16px")};
  display: flex;
  gap: 4px;
  justify-content: space-between;
  border-radius: 4px;
  align-items: center;
  font-weight: ${({ variant }) => (variant === "outline" ? 400 : 600)};
  cursor: pointer;
  border: ${({ variant }) => {
    if (variant === "outline") {
      return `1px solid rgba(0, 0, 0, 0.1)`;
    }
    return "none";
  }};

  font-size: ${({ variant }) => {
    if (variant === "outline") {
      return `12px`;
    }
    return "14px";
  }};

  white-space: nowrap;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    pointer-events: none;
  }
`;

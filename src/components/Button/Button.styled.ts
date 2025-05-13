import styled from "@emotion/styled";
import { ButtonVariants } from ".";

const buttonTheme: Record<ButtonVariants, Record<string, string>> = {
  primary: { text: "#ffffff", background: "#000000" },
  secondary: { text: "#000000", background: "#eaeaea" },
};

export const Button = styled.button<{ variant: ButtonVariants }>`
  background-color: ${({ variant }) => buttonTheme[variant].background};
  color: ${({ variant }) => buttonTheme[variant].text};
  padding: 12px 16px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
  border-radius: 4px;
  align-items: center;
  font-weight: 600;
`;

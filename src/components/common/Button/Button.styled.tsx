import styled from "@emotion/styled";

import { ButtonProps } from "./Button.types";

const buttonColors = {
  light: {
    backgroundColor: "#EAEAEA",
    color: "#000000",
  },
  dark: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
} as const;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 0;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  ${({ color }) => buttonColors[color]};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default StyledButton;

import styled from "@emotion/styled";

export const Button = styled.button`
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
`;

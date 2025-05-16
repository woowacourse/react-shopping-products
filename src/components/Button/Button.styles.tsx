import styled from "@emotion/styled";

export const Button = styled.button<{ backgroundColor: string }>`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

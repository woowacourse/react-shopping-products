import styled from "@emotion/styled";

export const Button = styled.button<{ backgroundColor: string; isLoading: boolean }>`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 4px;
  border: none;
  cursor: ${({ isLoading }) => (isLoading ? "not-allowed" : "pointer")};
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
`;

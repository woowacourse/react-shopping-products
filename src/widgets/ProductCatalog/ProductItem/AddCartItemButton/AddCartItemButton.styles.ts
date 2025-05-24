import styled from "@emotion/styled";

export const AddCartItemButton = styled.button`
  padding: 4px 8px;
  background-color: #000;
  color: #fff;
  border: none;
  width: 60px;
  border-radius: 4px;
  display: flex;
  gap: 4px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #333;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: default;
    opacity: 0.2;
  }
`;

export const Text = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 1.3;
`;

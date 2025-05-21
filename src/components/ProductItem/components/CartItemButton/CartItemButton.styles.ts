import styled from "@emotion/styled";

export const CartItemButton = styled.button<{ $isAdded: boolean }>`
  padding: 4px 8px;
  background-color: ${({ $isAdded }) => ($isAdded ? "#EAEAEA" : "#000")};
  color: ${({ $isAdded }) => ($isAdded ? "#000" : "#fff")};
  border: none;
  width: 60px;
  border-radius: 4px;
  display: flex;
  gap: 4px;
  cursor: pointer;
  position: absolute;
  right: 8px;
  bottom: 8px;
`;

export const CartItemAddText = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 1.3;
`;
